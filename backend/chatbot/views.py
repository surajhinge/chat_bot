import torch
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from transformers import AutoModelForCausalLM, AutoTokenizer
import json
from .models import Question
import threading

# Load model and tokenizer lazily
model = None
tokenizer = None
device = "cuda" if torch.cuda.is_available() else "cpu"

def load_model():
    """Load the model and tokenizer only when needed."""
    global model, tokenizer
    if model is None or tokenizer is None:
        model_name = "microsoft/DialoGPT-medium"
        tokenizer = AutoTokenizer.from_pretrained(model_name)
        model = AutoModelForCausalLM.from_pretrained(model_name).to(device)
        model.eval()  # Set model to evaluation mode for efficiency

@csrf_exempt
def chatbot_response(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            user_question = data.get("question", "").strip()

            if not user_question:
                return JsonResponse({"answer": "Please enter a valid question."}, status=400)

            # Check if the question already exists in the database
            existing_question = Question.objects.filter(question__iexact=user_question).only("answer").first()
            if existing_question:
                return JsonResponse({"answer": existing_question.answer})

            # Load model (lazy loading)
            load_model()

            # Run model inference in a separate thread
            response = generate_response(user_question)

            # Store the new question and answer in the database
            Question.objects.create(question=user_question, answer=response)

            return JsonResponse({"answer": response})

        except json.JSONDecodeError:
            return JsonResponse({"answer": "Invalid JSON format."}, status=400)

        except Exception as e:
            return JsonResponse({"answer": f"Error: {str(e)}"}, status=500)

    elif request.method == "GET":
        return JsonResponse({"answer": "Chatbot API is running. Use POST to ask a question."})

    return JsonResponse({"answer": "Invalid request method."}, status=405)


def generate_response(user_question):
    """Generate chatbot response asynchronously."""
    input_ids = tokenizer.encode(user_question + tokenizer.eos_token, return_tensors="pt").to(device)

    with torch.no_grad():  # Disable gradient calculations to speed up inference
        output = model.generate(
            input_ids,
            max_length=1000,
            pad_token_id=tokenizer.eos_token_id
        )

    return tokenizer.decode(output[:, input_ids.shape[-1]:][0], skip_special_tokens=True)
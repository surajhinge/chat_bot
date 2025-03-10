import torch
from transformers import AutoModelForCausalLM, AutoTokenizer
from memory_profiler import profile

# Load DialoGPT model and tokenizer
# model_name = "microsoft/DialoGPT-medium"
# model_name = "deepseek-ai/DeepSeek-R1"
model_name = "meta-llama/Meta-Llama-3-8B-Instruct"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

@profile
def chat():
    print("🤖 DialoGPT Chatbot (type 'exit' to quit)")
    chat_history_ids = None  # Stores chat history

    while True:
        user_input = input("You: ")
        if user_input.lower() == "exit":
            print("Chatbot: Goodbye! 👋")
            break
        
        # Encode user input and append to chat history
        new_input_ids = tokenizer.encode(user_input + tokenizer.eos_token, return_tensors="pt")
        chat_history_ids = torch.cat([chat_history_ids, new_input_ids], dim=-1) if chat_history_ids is not None else new_input_ids

        # Generate response
        response_ids = model.generate(chat_history_ids, max_length=1000, pad_token_id=tokenizer.eos_token_id)
        response = tokenizer.decode(response_ids[:, chat_history_ids.shape[-1]:][0], skip_special_tokens=True)
        
        print(f"Chatbot: {response}")

if __name__ == "__main__":
    chat()

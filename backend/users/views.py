from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from django.contrib.auth import get_user_model

User = get_user_model()

class LoginView(APIView):
    def get(self, request):
        return Response({'message': 'Use POST to login'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def post(self, request):
        mobile = request.data.get('mobile')
        password = request.data.get('password')
        try:
            user = User.objects.get(mobile=mobile)
            if user.check_password(password):
                refresh = RefreshToken.for_user(user)
                return Response({
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                })
        except User.DoesNotExist:
            pass
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class SignUpView(APIView):
    def get(self, request):
        return Response({'message': 'Use POST to signup'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def post(self, request):
        mobile = request.data.get('mobile')
        password = request.data.get('password')
        if User.objects.filter(mobile=mobile).exists():
            return Response({'error': 'Mobile number already exists'}, status=status.HTTP_400_BAD_REQUEST)
        user = User.objects.create_user(mobile=mobile, password=password)
        return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)

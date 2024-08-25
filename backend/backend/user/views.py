from django.contrib.auth import login, logout


from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from . import serializers





class UserRegister(APIView):
  permission_classes = [permissions.AllowAny,]
  def post(self, request):
    # TODO:add validation
    validated_data = request.data
    serializer = serializers.UserRegiserSerializer(data=validated_data)
    if serializer.is_valid(raise_exception=True):
      user = serializer.save()
      if user:
        return Response(status=status.HTTP_201_CREATED)

    return Response(status=status.HTTP_400_BAD_REQUEST)


class UserLogin(APIView):
  permission_classes = [permissions.AllowAny,]
  authentication_classes = (SessionAuthentication,)
  def post(self, request):
    # TODO:add validation
    validated_data = request.data
    serializer = serializers.UserLoginSerializer(data=validated_data)

    if serializer.is_valid(raise_exception=True):
      user = serializer.check_user(validated_data)
      login(request, user)
      return Response(status=status.HTTP_200_OK)

class UserLogout(APIView):
  def post(self, request):
    logout(request)
    return Response(status=status.HTTP_200_OK)

class UserView(APIView):
  permission_classes = [permissions.IsAuthenticated,]
  authentication_classes = [SessionAuthentication,]

  def get(self, request):
    serializer = serializers.UserSerializer(request.user)
    return Response({'user':serializer.data}, status=status.HTTP_200_OK)

from rest_framework import serializers
from . import models

from django.contrib.auth import authenticate, get_user_model

# in settings AUTH_USER_MODEL was overwritten
userModel = get_user_model()


class UserRegiserSerializer(serializers.ModelSerializer):
  class Meta:
    model = userModel
    fields = '__all__'

  def create(self, validated_data):
    user = models.CustomUser.objects.create_user(
      email=validated_data['email'],
      password=validated_data['password']
    )
    user.name = validated_data['name']
    user.save()
    return user

class UserLoginSerializer(serializers.Serializer):
  email = serializers.EmailField()
  password = serializers.CharField()

  def check_user(self, validated_data):
    user = authenticate(
      email=validated_data['email'],
      password=validated_data['password']
    )

    if not user:
      raise serializers.ValidationError('Wrong credentials')

    return user

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = userModel
    fields = ['email', 'name']

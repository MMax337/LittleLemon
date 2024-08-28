from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.contrib.auth.base_user import BaseUserManager

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None):
        if not email:
            raise ValueError('Email is required')

        if not password:
            raise ValueError('Password is required')

        email = self.normalize_email(email)
        user = self.model(email=email)

        # set_password stores a hashed password in the database
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password=None):
        user = self.create_user(email, password)
        user.is_superuser = True
        user.save()
        return user


class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=255)
    is_superuser = models.BooleanField(default=False)

    # Default field for login
    USERNAME_FIELD = 'email'
    # fields to register, the 'USERNAME_FIELD' and password are already included by default
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.name

from django.urls import path
from . import views

urlpatterns = [
  path('register', views.UserRegister.as_view()),
  path('login', views.UserLogin.as_view()),
  path('logout', views.UserLogout.as_view()),
  path('user', views.UserView.as_view()),
  path('users', views.UserList.as_view()),
  path('csrf_cookie', views.GetCSRFToken.as_view()),
  path('authenticated', views.CheckAuthView.as_view()),
]
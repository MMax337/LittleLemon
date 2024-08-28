from django.contrib.auth import login, logout


from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework import status, permissions
from . import serializers


from django.contrib.auth import get_user_model

from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie
"""
csrf_protect ensures that the view will be protected. The effect is the same
as that provided by CsrfViewMiddleware. Marking a view by csrf_protect is harmless.

ensure_csrf_cookie decorator ensures that the CSRF cookie is sent with the response.
"""

from django.utils.decorators import method_decorator
"""
method_decorator(decorator, name) marks the method named 'name' in a view with the 'decorator'
Normally is applied to the dispatch method (name ='dispatch') which is the method of APIView,
which decides the method of the request (post, get, etc).
"""



userModel = get_user_model()

@method_decorator(csrf_protect, name='dispatch')
class CheckAuthView(APIView):

  def get(self, request):
    user = request.user

    if user.is_authenticated:
      return Response({'success': 'Authenticated'},status=status.HTTP_200_OK)

    return Response({'message': 'Unauthenticated'},status=status.HTTP_401_UNAUTHORIZED)

@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCSRFToken(APIView):
  """
  This view will set the CSRF token into the cookies of the response.
  Using this method, the frontend can obtain the CSRF token to add in forms.
  """
  permission_classes = [permissions.AllowAny,]
  def get(self, request):
    return Response({'success':'CSRF cookie set'} )

@method_decorator(csrf_protect, name='dispatch')
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

@method_decorator(csrf_protect, name='dispatch')

class UserLogin(APIView):
  permission_classes = [permissions.AllowAny,]
  authentication_classes = (SessionAuthentication,)
  def post(self, request):
    # TODO:add validation
    validated_data = request.data
    print("DATA: ",validated_data)
    serializer = serializers.UserLoginSerializer(data=validated_data)

    if serializer.is_valid(raise_exception=True):
      user = serializer.check_user(validated_data)
      login(request, user)
      return Response(status=status.HTTP_200_OK)
@method_decorator(csrf_protect, name='dispatch')

class UserLogout(APIView):
  permission_classes = [permissions.IsAuthenticated,]
  def post(self, request):
    try:
      logout(request)
      return Response({'success':'user logged out'},status=status.HTTP_200_OK)
    except Exception as e:
      return Response({'message': e},status=status.HTTP_400_BAD_REQUEST)

# provides the details about the authenticated users
@method_decorator(csrf_protect, name='dispatch')
class UserView(APIView):
  permission_classes = [permissions.IsAuthenticated,]
  authentication_classes = [SessionAuthentication,]

  def get(self, request):
    serializer = serializers.UserSerializer(request.user)
    return Response({'user':serializer.data}, status=status.HTTP_200_OK)



class UserList(ListAPIView):
  queryset = userModel.objects.all()
  serializer_class = serializers.UserSerializer
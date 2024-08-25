from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend

from .permissions import IsAdminOrReadOnly

from . import models
from . import serializers
from . import filters


class MenuItemListCreateView(viewsets.ModelViewSet):
  queryset = models.MenuItem.objects.all()
  serializer_class = serializers.MenuItemSerializer
  permission_classes = [IsAdminOrReadOnly]
  filter_backends = (DjangoFilterBackend,)
  filterset_class = filters.MenuItemFilter
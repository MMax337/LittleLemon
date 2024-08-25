from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend

from . import models
from . import serializers
from . import filters


class MenuItemListCreateView(viewsets.ModelViewSet):
  queryset = models.MenuItem.objects.all()
  serializer_class = serializers.MenuItemSerializer
  filter_backends = (DjangoFilterBackend,)
  filterset_class = filters.MenuItemFilter
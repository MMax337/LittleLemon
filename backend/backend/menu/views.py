from rest_framework import viewsets


from . import models
from . import serializers

class MenuItemListCreateView(viewsets.ModelViewSet):
  queryset = models.MenuItem.objects.all()
  serializer_class = serializers.MenuItemSerializer
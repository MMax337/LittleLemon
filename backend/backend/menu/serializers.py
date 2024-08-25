from rest_framework import serializers
from . import models

class MenuItemSerializer(serializers.ModelSerializer):
  class Meta:
    model = models.MenuItem
    fields = '__all__'
    read_only_fields = ('id',)

  def to_representation(self, instance):
    # make an image field a full url
    representation = super().to_representation(instance)
    representation['image'] = instance.image.url
    return representation

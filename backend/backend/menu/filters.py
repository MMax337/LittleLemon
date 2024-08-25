# filters.py
import django_filters
from .models import MenuItem

class MenuItemFilter(django_filters.FilterSet):
    special = django_filters.BooleanFilter(field_name='isSpecialOfTheDay', lookup_expr='exact')

    class Meta:
        model = MenuItem
        fields = ['special']


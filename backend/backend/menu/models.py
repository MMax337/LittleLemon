from django.db import models

# Create your models here.
class MenuItem(models.Model):
  name = models.CharField(max_length=255)
  price = models.DecimalField(max_digits=6, decimal_places=2)
  description = models.TextField()
  isSpecialOfTheDay = models.BooleanField(default=False)
  image = models.ImageField(upload_to='menu_images/')

  def __str__(self) -> str:
    return self.name
from django.db import models
from django.contrib.auth.models import User
import datetime

# Create your models here.
#steptrack garna 
class StepsTracker(models.Model):
  user = models.ForeignKey(User,on_delete=models.CASCADE)
  data = models.TextField()
  steps = models.IntegerField()

  def __str__(self):
    return f"{self.user.username}'s steps on {self.date}"

#waterintake herna

class WaterIntake(models.Model):
  user = models.ForeignKey(User,on_delete=models.CASCADE)
  data = models.TextField()
  amount = models.FloatField() #liters  

  def __str__(self):
    return f"{self.user.username}'s water intake on {self.date}"
  

class Reminder(models.Model):
  user = models.ForeignKey(User,on_delete=models.CASCADE )
  reminder_text = models.CharField( max_length=250)
  reminder_time = models.TimeField()
  date = models.DateField(default=datetime.datetime.now())

  def __str__(self):
    return f"remender for{self.user.username} at{self.reminder.time}"


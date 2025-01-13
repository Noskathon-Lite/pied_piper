from django.urls import path
from .views import *

#to view in webpage connecting the views.py of fit_app
urlpatterns = [
    path('',index,name='index'),
    path('steps/',step_view,name='steps_view'),
    path('water/',water_view,name='water_view'),
    # path('reminder/' reminder_view,name='reminder_view'),
    # path('get_today_reminder/',get_today_reminders,name = 'get_today_reminders'),
]

  
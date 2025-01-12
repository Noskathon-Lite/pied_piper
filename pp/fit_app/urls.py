from django.urls import path
from . import views

#to view in webpage connecting the views.py of fit_app
urlpatterns = [
    # path('',views.index,name='index'),
    path('steps/',views.step_view,name='steps_view'),
    path('water/',views.water_view,name='water_view'),
    path('reminder/',views.reminder_view,name='reminder_view'),
    path('get_today_reminder/',views.get_today_reminders,name = 'get_today_reminders'),
]

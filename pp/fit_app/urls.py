from django.urls import path
from . import views

#to view in webpage connecting the views.py of fit_app
urlpatterns = [
    path('',views.index,name='index'),
    path('',views.save_step,name='save_step'),
    path('',views.log_water,name='log_water')
]

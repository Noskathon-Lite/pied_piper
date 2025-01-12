from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
import json

# home page - serve html
def index (request ):
  return render (request,'fit_app/intex.html')


# api step count save garna 
def save_step(request):
  if request.methon == 'POST':
    data = json.load(request.body) #json lai req 
    step = data.get ('steps',0)
    #to save step in database 'aaru action garna ni hunnxa'
    return  JsonResponse({'message':'Step save succesfully'})
  return JsonResponse ({'erro':'invalid request'},status=404)


#api for water

def log_water(request):
  if request.method =='POST':
    data = json.load(request.body)
    amount = data.get('amount',0)
    #to save water intake here
    return JsonResponse({'message':"water logged "})
  return JsonResponse({'error':'invalid request'},statue=404)
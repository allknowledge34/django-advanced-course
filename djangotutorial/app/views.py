from django.contrib.sites import requests
from django.shortcuts import render
from django.http import HttpResponse
import requests

# Create your views here.
def News(request):
    url = 'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=59db29c8b6d04425a293938e73cee5a6'
    cricket_news = requests.get(url).json()

    a = cricket_news['articles']
    desc = []
    title = []
    img = []
    for i in range(len(a)):
        f = a[i]
        title.append(f['title'])
        desc.append(f['description'])
        img.append(f['urlToImage'])

    mylist = zip(title, desc, img)
    context = {'mylist': mylist}
    return render(request, 'News.html', context)
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import ArticleGenerateSerializer
from .services import generate_article

class ArticleGenerateView(APIView):
    permission_classes = []

    def post(self, request):
        serializer = ArticleGenerateSerializer(data=request.data)
        if serializer.is_valid():
            title = serializer.validated_data['title']
            length = serializer.validated_data['length']
            
            try:
                article_content = generate_article(title, length)
                return Response({
                    "title": title,
                    "article": article_content
                }, status=status.HTTP_200_OK)
            except ValueError as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            except Exception as e:
                return Response({"error": "Failed to generate article."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

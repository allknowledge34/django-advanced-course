from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import ImageGenerateSerializer
from .services import generate_image

class ImageGenerateView(APIView):
    permission_classes = []

    def post(self, request):
        serializer = ImageGenerateSerializer(data=request.data)
        if serializer.is_valid():
            prompt = serializer.validated_data['prompt']
            
            try:
                image_data = generate_image(prompt)
                return Response({
                    "prompt": prompt,
                    "image": image_data
                }, status=status.HTTP_200_OK)
            except ValueError as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            except Exception as e:
                return Response({"error": "Failed to generate image."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

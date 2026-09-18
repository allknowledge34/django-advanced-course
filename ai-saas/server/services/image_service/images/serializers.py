from rest_framework import serializers

class ImageGenerateSerializer(serializers.Serializer):
    prompt = serializers.CharField(max_length=1000, required=True, allow_blank=False)

from rest_framework import serializers

class ArticleGenerateSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=255, required=True, allow_blank=False)
    length = serializers.IntegerField(required=True, min_value=100, max_value=5000)

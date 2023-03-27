from aplicacao.models import Pessoa
from aplicacao.models import Contatos
from rest_framework.views import APIView
from rest_framework.serializers import ModelSerializer
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404


class ContatosSerializer(ModelSerializer):
    class Meta:
        model = Contatos
        fields = ['telefone', 'email', 'whatsapp']


class PessoaSerializer(ModelSerializer):
    contatos = ContatosSerializer()

    class Meta:
        model = Pessoa
        fields = ['nome', 'cpf', 'contatos']


class ContatosPostSerializer(ModelSerializer):

    class Meta:
        model = Contatos
        fields = '__all__'


class PessoaPostSerializer(ModelSerializer):
    contatos = ContatosPostSerializer(many=True)

    class Meta:
        model = Pessoa
        fields = '__all__'

    def create(self, validated_data):
        contatos_user = validated_data.pop('contatos')

        contato = Contatos.objects.create(telefone=contatos_user[0].get('telefone'),
                                          email=contatos_user[0].get('email'),
                                          whatsapp=contatos_user[0].get('whatsapp'))
        pessoa = Pessoa.objects.create(nome=validated_data.get('nome'), cpf=validated_data.get('cpf'), contatos=contato)
        return pessoa


class FilterPessoaByCpfView(APIView):
    def get(self, request, cpf):
        data_pessoa = get_object_or_404(Pessoa.objects.all(), cpf=cpf)
        serializer_pessoa = PessoaSerializer(data_pessoa)

        return Response({"status": "success", "data": serializer_pessoa.data}, status=status.HTTP_200_OK)

    def delete(self, request, cpf):
        data_pessoa = get_object_or_404(Pessoa.objects.all(), cpf=cpf)
        data_pessoa.delete()

        return Response({"status": "success"}, status=status.HTTP_204_NO_CONTENT)

    def patch(self, request, cpf):
        data_pessoa = get_object_or_404(Pessoa.objects.all(), cpf=cpf)
        data_pessoa.nome = request.data.get('nome')

        contatos = request.data.pop('contatos')
        data_pessoa.contatos.telefone = contatos.get('telefone')
        data_pessoa.contatos.whatsapp = contatos.get('whatsapp')
        data_pessoa.contatos.email = contatos.get('email')
        data_pessoa.save()
        print(data_pessoa.contatos.telefone)
        teste = get_object_or_404(Pessoa.objects.all(), cpf=cpf)
        print(teste)
        return Response({"status": "success"}, status=status.HTTP_206_PARTIAL_CONTENT)


class PessoaView(APIView):
    def get(self, request):
        data_pessoa = list(Pessoa.objects.all())
        serializer_pessoa = PessoaSerializer(data_pessoa, many=True)

        return Response({"status": "success", "data": serializer_pessoa.data}, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = PessoaPostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success"}, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)




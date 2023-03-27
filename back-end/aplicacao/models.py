from django.db import models


class Contatos(models.Model):
    telefone = models.CharField(max_length=100)
    email = models.EmailField()
    whatsapp = models.CharField(max_length=100)



class Pessoa(models.Model):
    nome = models.CharField(max_length=100)
    cpf = models.CharField(max_length=100)
    contatos = models.ForeignKey(Contatos, null=True, blank=True, related_name='contatos_user', on_delete=models.SET_NULL)
    data_criacao = models.DateTimeField(auto_now=True)

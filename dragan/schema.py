import graphene
from graphene_django.debug import DjangoDebug

import kviz.schema

class Query(kviz.schema.Query, graphene.ObjectType):
    """
    There are queries.

    """

    debug = graphene.Field(DjangoDebug, name='_debug')



class Mutation(kviz.schema.Mutation, graphene.ObjectType):
    """
     There are three types of mutation
    """
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)
# schema = graphene.Schema(query=Query)
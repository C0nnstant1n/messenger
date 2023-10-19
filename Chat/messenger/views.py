from rest_framework import viewsets, permissions, generics
from .serializers import *
from django.views.generic import CreateView, TemplateView
from .forms import CreateMessageForm
from .models import Room
from django.contrib.auth.mixins import LoginRequiredMixin


class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user == obj.author


class CurrentUser(LoginRequiredMixin, viewsets.ReadOnlyModelViewSet):
    serializer_class = CurrentUserSerializer

    def get_queryset(self):
        if self.request.user.is_authenticated:
            queryset = User.objects.filter(id=self.request.user.id).distinct()
        else:
            queryset = []
        return queryset


class UsersViewSet(LoginRequiredMixin, viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UsersSerializer


class MessageViewSet(LoginRequiredMixin, viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

    def get_queryset(self):
        queryset = []
        target = self.request.query_params.get('target')
        if target is not None:
            queryset = Message.objects.filter(target=target).distinct()
        return queryset


class RoomViewSet(LoginRequiredMixin, IsOwnerOrReadOnly, viewsets.ModelViewSet):
    serializer_class = RoomSerializer
    permission_classes = [IsOwnerOrReadOnly]

    def get_queryset(self):
        if self.request.user.is_authenticated:
            queryset = Room.objects.filter(members=self.request.user.id).distinct()
        else:
            queryset = []
        return queryset

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


# class RoomDetailViewSet(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Room.objects.all()
#     serializer_class = RoomSerializer


class RoomMembersViewSet(LoginRequiredMixin, viewsets.ModelViewSet):
    queryset = RoomMembers.objects.all()
    serializer_class = RoomMembersSerializer


class IndexView(TemplateView):
    template_name = 'default.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        return context


class CreateRoomView(LoginRequiredMixin, TemplateView):
    template_name = 'messenger/create_room.html'

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

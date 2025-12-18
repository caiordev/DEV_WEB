package br.gov.ma.ssp.whatsapp_service.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.gov.ma.ssp.whatsapp_service.dto.GroupRequest;
import br.gov.ma.ssp.whatsapp_service.dto.GroupResponse;
import br.gov.ma.ssp.whatsapp_service.entity.Contact;
import br.gov.ma.ssp.whatsapp_service.entity.Group;
import br.gov.ma.ssp.whatsapp_service.repository.ContactRepository;
import br.gov.ma.ssp.whatsapp_service.repository.GroupRepository;

@Service
public class GroupService {

    private final GroupRepository groupRepository;
    private final ContactRepository contactRepository;

    public GroupService(GroupRepository groupRepository, ContactRepository contactRepository) {
        this.groupRepository = groupRepository;
        this.contactRepository = contactRepository;
    }

    @Transactional
    public GroupResponse createGroup(GroupRequest request) {
        if (groupRepository.existsByNome(request.getNome())) {
            throw new RuntimeException("Grupo com este nome já existe");
        }

        Group group = new Group();
        group.setNome(request.getNome());
        group.setDescricao(request.getDescricao());

        Group savedGroup = groupRepository.save(group);
        return new GroupResponse(savedGroup, true);
    }

    @Transactional(readOnly = true)
    public GroupResponse getGroupById(Long id) {
        Group group = groupRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Grupo não encontrado"));
        return new GroupResponse(group, true);
    }

    @Transactional(readOnly = true)
    public List<GroupResponse> getAllGroups() {
        return groupRepository.findAll().stream()
                .map(group -> new GroupResponse(group, true))
                .collect(Collectors.toList());
    }

    @Transactional
    public GroupResponse updateGroup(Long id, GroupRequest request) {
        Group group = groupRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Grupo não encontrado"));

        if (!request.getNome().equals(group.getNome()) && groupRepository.existsByNome(request.getNome())) {
            throw new RuntimeException("Grupo com este nome já existe");
        }

        group.setNome(request.getNome());
        group.setDescricao(request.getDescricao());

        Group updatedGroup = groupRepository.save(group);
        return new GroupResponse(updatedGroup, true);
    }

    @Transactional
    public void deleteGroup(Long id) {
        if (!groupRepository.existsById(id)) {
            throw new RuntimeException("Grupo não encontrado");
        }
        groupRepository.deleteById(id);
    }

    @Transactional
    public GroupResponse addContactToGroup(Long groupId, Long contactId) {
        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Grupo não encontrado"));

        Contact contact = contactRepository.findById(contactId)
                .orElseThrow(() -> new RuntimeException("Contato não encontrado"));

        if (group.getContacts().contains(contact)) {
            throw new RuntimeException("Contato já está no grupo");
        }

        group.addContact(contact);
        Group updatedGroup = groupRepository.save(group);
        return new GroupResponse(updatedGroup, true);
    }

    @Transactional
    public GroupResponse removeContactFromGroup(Long groupId, Long contactId) {
        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Grupo não encontrado"));

        Contact contact = contactRepository.findById(contactId)
                .orElseThrow(() -> new RuntimeException("Contato não encontrado"));

        if (!group.getContacts().contains(contact)) {
            throw new RuntimeException("Contato não está no grupo");
        }

        group.removeContact(contact);
        Group updatedGroup = groupRepository.save(group);
        return new GroupResponse(updatedGroup, true);
    }
}

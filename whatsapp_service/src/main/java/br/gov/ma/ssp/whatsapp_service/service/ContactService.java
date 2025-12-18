package br.gov.ma.ssp.whatsapp_service.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.gov.ma.ssp.whatsapp_service.dto.ContactRequest;
import br.gov.ma.ssp.whatsapp_service.dto.ContactResponse;
import br.gov.ma.ssp.whatsapp_service.entity.Contact;
import br.gov.ma.ssp.whatsapp_service.repository.ContactRepository;

@Service
public class ContactService {

    private final ContactRepository contactRepository;

    public ContactService(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    @Transactional
    public ContactResponse createContact(ContactRequest request) {
        if (request.getCpf() != null && contactRepository.existsByCpf(request.getCpf())) {
            throw new RuntimeException("CPF já cadastrado");
        }

        if (contactRepository.existsByContato(request.getContato())) {
            throw new RuntimeException("Contato já cadastrado");
        }

        Contact contact = new Contact();
        contact.setNome(request.getNome());
        contact.setCpf(request.getCpf());
        contact.setContato(request.getContato());

        Contact savedContact = contactRepository.save(contact);
        return new ContactResponse(savedContact);
    }

    @Transactional(readOnly = true)
    public ContactResponse getContactById(Long id) {
        Contact contact = contactRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Contato não encontrado"));
        return new ContactResponse(contact);
    }

    @Transactional(readOnly = true)
    public List<ContactResponse> getAllContacts() {
        return contactRepository.findAll().stream()
                .map(ContactResponse::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public ContactResponse updateContact(Long id, ContactRequest request) {
        Contact contact = contactRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Contato não encontrado"));

        if (request.getCpf() != null && !request.getCpf().equals(contact.getCpf())) {
            if (contactRepository.existsByCpf(request.getCpf())) {
                throw new RuntimeException("CPF já cadastrado");
            }
        }

        if (!request.getContato().equals(contact.getContato())) {
            if (contactRepository.existsByContato(request.getContato())) {
                throw new RuntimeException("Contato já cadastrado");
            }
        }

        contact.setNome(request.getNome());
        contact.setCpf(request.getCpf());
        contact.setContato(request.getContato());

        Contact updatedContact = contactRepository.save(contact);
        return new ContactResponse(updatedContact);
    }

    @Transactional
    public void deleteContact(Long id) {
        if (!contactRepository.existsById(id)) {
            throw new RuntimeException("Contato não encontrado");
        }
        contactRepository.deleteById(id);
    }
}

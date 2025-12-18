package br.gov.ma.ssp.whatsapp_service.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.gov.ma.ssp.whatsapp_service.dto.AddContactToGroupRequest;
import br.gov.ma.ssp.whatsapp_service.dto.GroupRequest;
import br.gov.ma.ssp.whatsapp_service.dto.GroupResponse;
import br.gov.ma.ssp.whatsapp_service.service.GroupService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/groups")
public class GroupController {

    private final GroupService groupService;

    public GroupController(GroupService groupService) {
        this.groupService = groupService;
    }

    @PostMapping
    public ResponseEntity<GroupResponse> createGroup(@Valid @RequestBody GroupRequest request) {
        GroupResponse response = groupService.createGroup(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<GroupResponse> getGroupById(@PathVariable Long id) {
        GroupResponse response = groupService.getGroupById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<GroupResponse>> getAllGroups() {
        List<GroupResponse> groups = groupService.getAllGroups();
        return ResponseEntity.ok(groups);
    }

    @PutMapping("/{id}")
    public ResponseEntity<GroupResponse> updateGroup(
            @PathVariable Long id,
            @Valid @RequestBody GroupRequest request) {
        GroupResponse response = groupService.updateGroup(id, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGroup(@PathVariable Long id) {
        groupService.deleteGroup(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{groupId}/contacts")
    public ResponseEntity<GroupResponse> addContactToGroup(
            @PathVariable Long groupId,
            @Valid @RequestBody AddContactToGroupRequest request) {
        GroupResponse response = groupService.addContactToGroup(groupId, request.getContactId());
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{groupId}/contacts/{contactId}")
    public ResponseEntity<GroupResponse> removeContactFromGroup(
            @PathVariable Long groupId,
            @PathVariable Long contactId) {
        GroupResponse response = groupService.removeContactFromGroup(groupId, contactId);
        return ResponseEntity.ok(response);
    }
}

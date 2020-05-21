import { resourceService } from '@/services/resource.service';

export function fetchResources({}) {
  return resourceService.index();
}

export function createResource({}, payload) {
  return resourceService.create(payload);
}

export function deleteResource({}, payload) {
  return resourceService.delete(payload);
}

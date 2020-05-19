import { client } from '@/boot/apollo';
import {
  CREATE_RESOURCE_MUTATION,
  DELETE_RESOURCE_MUTATION
} from '../../../graphql/mutations';
import { FETCH_RESOURCES_QUERY } from '@/graphql/queries';
import {
  showErrorNotification,
  showSuccessNotification
} from '@/functions/function-show-notifications';

import { resourceService } from '@/services/resource.service'

export function fetchResources({}) {
  return resourceService.index()
}

export function createResource({}, payload) {
  return projectService.create(payload)
}

export function deleteResource({ commit }, payload) {
  return resourceService.delete(payload)
}

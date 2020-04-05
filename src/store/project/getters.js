import { getField } from "vuex-map-fields";
import { convertToNumber } from "../../functions/function-convert-to-number";

export function nep_total(state) {
  return convertToNumber(state.project.nep_2017) +
    convertToNumber(state.project.nep_2018) +
    convertToNumber(state.project.nep_2019) +
    convertToNumber(state.project.nep_2020) +
    convertToNumber(state.project.nep_2021) +
    convertToNumber(state.project.nep_2022);
}

export function gaa_total(state) {
  return convertToNumber(state.project.gaa_2017) +
    convertToNumber(state.project.gaa_2018) +
    convertToNumber(state.project.gaa_2019) +
    convertToNumber(state.project.gaa_2020) +
    convertToNumber(state.project.gaa_2021) +
    convertToNumber(state.project.gaa_2022)
}

export function disbursement_total(state) {
  return convertToNumber(state.project.disbursement_2017) +
    convertToNumber(state.project.disbursement_2018) +
    convertToNumber(state.project.disbursement_2019) +
    convertToNumber(state.project.disbursement_2020) +
    convertToNumber(state.project.disbursement_2021) +
    convertToNumber(state.project.disbursement_2022);
}

export function getLoading(state) {
  return state.loading;
}

export { getField };

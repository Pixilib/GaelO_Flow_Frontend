import axios from "./axios";
import { OrthancImportDicom, Tags } from "../utils/types";

export const sendDicom = (payload: Uint8Array): Promise<OrthancImportDicom> => {
  return axios
    .post(`/api/instances`, payload, {
      headers: { "Content-Type": "application/dicom" },
    })
    .then((response: any) => {
      const data = response.data;
      return {
        id: data.ID,
        parentPatient: data.ParentPatient,
        parentSeries: data.ParentSeries,
        parentStudy: data.ParentStudy,
      };
    })
    .catch(function (error) {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
};

export const sendZipDicom = (payload: Uint8Array): Promise<OrthancImportDicom[]> => {
  return axios
    .post(`/api/instances`, payload, {
      headers: { "Content-Type": "application/zip" },
    })
    .then((response: any) => {
      const data = response.data;
      return data.map((instance: any) => ({
        id: instance.ID,
        parentPatient: instance.ParentPatient,
        parentSeries: instance.ParentSeries,
        parentStudy: instance.ParentStudy,
      }));
    })
    .catch(function (error) {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
};

export const createDicom = (
  content: string[],
  tags: object = {},
  parentOrthancId?: string
) => {
  let payload = {
    Content: content,
    Tags: tags,
    Parent: parentOrthancId,
  };

  return axios
    .post("/api/tools/create-dicom", payload)
    .then(() => {
      return null;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const previewInstance = (instanceId: string): Promise<any> => {
  return axios
    .get("/api/instances/" + instanceId + "/preview", { responseType: "blob" })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const previewFrame = (
  instanceId: string,
  frame: number
): Promise<any> => {
  return axios
    .get("/api/instances/" + instanceId + "/frames/" + frame + "/preview", {
      responseType: "blob",
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const instanceTags = (
  instanceId: string
): Promise<Tags> => {
  return axios
    .get("/api/instances/" + instanceId + "/tags?simplfy")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
};

export const instanceHeader = (
  instanceId: string
): Promise<Tags> => {
  return axios
    .get("/api/instances/" + instanceId + "/header?simplfy")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
};

import axios from "./axios";
import { OrthancImportDicom, Tags } from "../utils/types";

export const sendDicom = (payload: Uint8Array, labels: string[], isZip: boolean): Promise<OrthancImportDicom | OrthancImportDicom[]> => {
  const queryParams = labels.map((label) => `${encodeURIComponent(label)}`).join(",");

  return axios
    .post(labels.length === 0 ? `/api/instances` : `/api/tools/upload-and-label?label=${queryParams}`,
      payload, {
        headers: { "Content-Type": isZip ? "application/zip" : "application/dicom" },
      }
    )
    .then((response: any) => {
      const data = response.data;
      if (!isZip) {
        return {
          id: data.ID,
          parentPatient: data.ParentPatient,
          parentSeries: data.ParentSeries,
          parentStudy: data.ParentStudy,
        };
      } else {
        return data.map((instance: any) => ({
          id: instance.ID,
          parentPatient: instance.ParentPatient,
          parentSeries: instance.ParentSeries,
          parentStudy: instance.ParentStudy,
        }));
      }
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
  force: boolean = false,
  parentOrthancId?: string
) => {
  let payload = {
    Content: content,
    Tags: tags,
    Force: force,
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

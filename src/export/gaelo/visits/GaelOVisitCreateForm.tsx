import { Colors } from "../../../utils";
import { Button, Card, CardBody, CardHeader, Input, Label, SelectInput } from "../../../ui";
import { useEffect, useState } from "react";
import { formatDate } from "../../../utils/export";
import { StudyMainDicomTags } from "../../../utils/types";

export type CreateVisitForm = {
  visitType: string;
  visitId: number;
  status: string;
  date: string;
  reasonForNotDone: string | null;
  otherReasonForNotDone: string | null;
}

type GaelOVisitCreateFormProps = {
  visitType: Record<string, any>;
  studyMainDicomTag: StudyMainDicomTags;
  onCreateVisit: (data: CreateVisitForm) => void;
}

const listStatus = [
  { value: "Done", label: "Done" },
  { value: "Not Done", label: "Not Done" }
]

const listReasonForNotDone = [
  { value: "Not Performed", label: "Not Performed" },
  { value: "Image Lost", label: "Image Lost" },
  { value: "Patient Withdrawn", label: "Patient Withdrawn" },
  { value: "Other", label: "Other" }
]

const GaelOVisitCreateForm = ({
  visitType,
  studyMainDicomTag,
  onCreateVisit
}: GaelOVisitCreateFormProps) => {

  const [createVisitForm, setCreateVisitForm] = useState<CreateVisitForm>(null);

  useEffect(() => {
    setCreateVisitForm({
      visitType: visitType.name,
      visitId: visitType.id,
      status: null,
      date: formatDate(studyMainDicomTag?.studyDate),
      reasonForNotDone: null,
      otherReasonForNotDone: null,
    });
  }, []);

  return (
    <Card>
      <CardHeader
        color={Colors.primary}
        className="text-white"
        children={
          <p className="font-bold ml-3">Create {visitType.name} </p>
        }
      />
      <CardBody
        children={
          <div className="flex flex-col gap-3">
            <div className="flex flex-row gap-3">
              <div className="w-full">
                <Label value="Status" />
                <SelectInput
                  placeholder="Select Status"
                  value={createVisitForm?.status}
                  options={listStatus}
                  onChange={(event: any) => {
                    setCreateVisitForm({
                      ...createVisitForm,
                      date: event.value === "Done" ? createVisitForm?.date : null,
                      status: event.value
                    });
                  }}
                />
              </div>
              <div className="w-full">
                {createVisitForm?.status &&
                  (createVisitForm?.status === "Done" ? (
                    <>
                      <Label value="Visit Date" />
                      <Input
                        placeholder="Visit Date"
                        value={createVisitForm?.date}
                        onChange={(event) => {
                          setCreateVisitForm({
                            ...createVisitForm,
                            date: event.target.value
                          });
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <Label value="Reason for not done" />
                      <SelectInput
                        placeholder="Select Reason"
                        value={createVisitForm?.reasonForNotDone}
                        options={listReasonForNotDone}
                        onChange={(event: any) => {
                          setCreateVisitForm({
                            ...createVisitForm,
                            reasonForNotDone: event.value
                          });
                        }}
                      />
                    </>
                  )
                  )
                }
              </div>
            </div>
            {createVisitForm?.reasonForNotDone === "Other" &&
              <div className="flex flex-col items-end">
                <div className="w-49/100">
                  <Label value="Other" />
                  <Input
                    value={createVisitForm?.otherReasonForNotDone}
                    placeholder="Enter reason"
                    onChange={(event) => {
                      setCreateVisitForm({
                        ...createVisitForm,
                        otherReasonForNotDone: event.target.value
                      });
                    }}
                  />
                </div>
              </div>
            }
            <div className="flex items-center justify-center">
              <Button
                color={Colors.primary}
                className="h-10 w-45"
                children={
                  <p>Create {visitType.name}</p>
                }
                onClick={() => {
                  onCreateVisit(createVisitForm);
                }}
              />
            </div>
          </div>
        }
      />
    </Card>
  )
};

export default GaelOVisitCreateForm;
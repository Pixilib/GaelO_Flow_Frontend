import SearchForm from "../query/SearchForm";
import { getLabels } from "../services";
import { findTools } from "../services/tools";
import { FormCard } from "../ui";
import { QueryPayload, useCustomMutation, useCustomQuery } from "../utils";
import { FindAnswer } from "../utils/types";


const OrthancRoot = () => {


    const { data: labelsData } = useCustomQuery<string[]>(
        ['labels'],
        () => getLabels(),
    );

    const { mutateAsync: mutateTools } = useCustomMutation<FindAnswer[], any>(
        ({ formData }) => findTools(formData),
        [],
        {
            onSuccess: (data) => {
                console.log(data);
            },
            onError: () => {
                console.log("Error");
            }
        }
    )
    const handleSubmit = async (formData: QueryPayload) => {
        console.log(formData);
        await mutateTools({ formData });
    }


    return (
        <div>
            <FormCard
                className={`gap-y-7 flex flex-col justify-center bg-white`}
                title={"Search"}
                collapsible={true}
            >
                <SearchForm
                    onSubmit={handleSubmit}
                    labelsData={labelsData}
                    withAets={true}
                />
            </FormCard>
            {/* <Card>
          <CardBody color={Colors.light} className="px-3 rounded-xl">
            <h2 className="mt-4 mb-5 text-2xl font-bold text-primary">Results</h2>
            <div className="grid grid-cols-1 gap-2 mt-1 xl:grid-cols-12">
              <div className="grid-cols-1 xl:col-span-7">
                <ResultsTable results={studies} onRowClick={handleRowClick} />
              </div>
              <div className="grid-cols-1 xl:col-span-5">
                <SeriesTable series={series} />
              </div>
            </div>
          </CardBody>
        </Card> */}
        </div>
    )

};
export default OrthancRoot;
type GaeloVisitDetailsProps = {
    visit: any;
};

const GaeloVisitDetails = ({ visit }: GaeloVisitDetailsProps) => {
    const textStyle = "text-sm text-gray-700 dark:text-white";
    const bold = "font-semibold";

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-gray-200 dark:bg-gray-600 p-4 rounded-lg shadow-md">
            <p className={textStyle}>
                <span className={bold}>Visit type :</span> {visit?.visitType?.name}
            </p>
            <p className={textStyle}>
                <span className={bold}>PatientId :</span> {visit?.patientId}
            </p>
            <p className={textStyle}>
                <span className={bold}>Status :</span> {visit?.statusDone}
            </p>
            <p className={textStyle}>
                <span className={bold}>Uploading status :</span> {visit?.uploadStatus}
            </p>
            <p className={textStyle}>
                <span className={bold}>Visit date :</span> {visit?.visitDate?.slice(0, 10)}
            </p>
            <p className={textStyle}>
                <span className={bold}>Investigator Form :</span> {visit?.stateInvestigatorForm}
            </p>
        </div>
    )
}

export default GaeloVisitDetails;
import { RuleCondition } from "./types";

type AutoRoutingRulesTableProps = {
    rules: RuleCondition[];
};

const AutoRoutingRulesTable = ({ rules }: AutoRoutingRulesTableProps) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Condition</th>
                </tr>
            </thead>
            <tbody>
                {rules.map((rule, index) => (
                    <tr key={index}>
                        <td>{rule}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default AutoRoutingRulesTable;

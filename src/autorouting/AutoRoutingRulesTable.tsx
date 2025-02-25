import { useEffect, useState } from "react";
import { RuleCondition } from "./types";

type AutoRoutingRulesTableProps = {
    rules: RuleCondition[];
};

const AutoRoutingRulesTable = ({ rules: initialRules }: AutoRoutingRulesTableProps) => {
    const [rules, setRules] = useState<RuleCondition[]>(initialRules);

    useEffect(() => {
        const fetchRules = async () => {
            try {
                const response = await fetch("https://api.example.com/rules");
                if (response.ok) {
                    const data = await response.json();
                    setRules(data.rules);
                } else {
                    console.error("Failed to fetch rules.");
                }
            } catch (error) {
                console.error("An error occurred while fetching the rules.", error);
            }
        };

        fetchRules();
    }, []);

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

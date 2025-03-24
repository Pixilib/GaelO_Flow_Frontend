const AutoRoutingRule = () => {
  // Function to update an existing rule
  const updateRule = (index, key, value) => {
    setRules(
      rules.map((rule, i) => (i === index ? { ...rule, [key]: value } : rule))
    );
    clearError();
  };

  // Function to remove a rule
  const removeRule = (index) => {
    setRules(rules.filter((_, i) => i !== index));
    clearError();
  };

  return (
    <div key={index} style={{ marginTop: 10, display: "flex", gap: 10 }}>
      <SelectInput
        value={rule.DicomTag}
        onChange={(e) => updateRule(index, "DicomTag", e.value)}
        options={Object.values(AutoRoutingRuleDicomTag).map((value) => ({
          label: value,
          value,
        }))}
        disabled={isLoading}
      />
      <SelectInput
        value={rule.ValueRepresentation}
        onChange={(e) => updateRule(index, "ValueRepresentation", e.value)}
        options={Object.values(AutoRoutingRuleValueRepresentation).map(
          (value) => ({ label: value, value })
        )}
        disabled={isLoading}
      />
      <SelectInput
        value={rule.Condition}
        onChange={(e) => updateRule(index, "Condition", e.value)}
        options={Object.values(AutoRoutingRuleCondition).map((value) => ({
          label: value,
          value,
        }))}
        disabled={isLoading}
      />
      <Input
        placeholder="Value"
        value={rule.Value}
        onChange={(e) => updateRule(index, "Value", e.target.value)}
        disabled={isLoading}
      />
      <Button
        color={Colors.danger}
        onClick={() => removeRule(index)}
        disabled={isLoading}
      >
        <Trash />
      </Button>
    </div>
  );
};

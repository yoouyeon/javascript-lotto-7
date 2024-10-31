import CustomError from './CustomError.js';

const checkRuleSet = (target, ruleSet) => {
  Object.values(ruleSet).forEach((rule) => {
    if (!rule.isValid(target)) {
      throw new CustomError(rule.errorMessage);
    }
  });
};

export default checkRuleSet;

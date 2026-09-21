export const icon = (name) => {
  const map = {
    book:"📚", plan:"🗓️", brain:"🧠", check:"✓", evidence:"🔎",
    report:"📝", toolkit:"🧰", dept:"🏛️", conversation:"💬",
    follow:"↪", search:"⌕", home:"⌂", arrow:"→"
  };
  return map[name] || "•";
};

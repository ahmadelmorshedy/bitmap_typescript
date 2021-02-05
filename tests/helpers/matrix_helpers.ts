function MatricesEqual(m1, m2): boolean {
  if(m1.length != m2.length) {
    return false;
  }

  for (let i=0; i < m1.length; i++) {
    if (m1[i].length != m2[i].length) {
      return false;
    }

    for (let j=0; j < m1[i].length; j++) {
      if (m1[i][j] != m2[i][j]) {
        return false;
      }
    }
  }

  return true;
}

export default MatricesEqual;
import React from 'react';

const descriptionText = "Τέσσερις φυλές έχουν εγκατασταθεί στο νησί του Κατάν. Εκμεταλλεύσου την περιοχή που έχεις στη διάθεσή σου αποκτώντας προϊόντα και κάνοντας εμπόριο με τoυς υπόλοιπους για να επεκταθείς και να κυριαρχήσεις εσύ στο νησί!<br />Οι Άποικοι του Κατάν είναι το παιχνίδι-must για κάθε 'σοβαρό' παίκτη, αφού παίζεται με μανία από εκατομμύρια ανθρώπους σε όλον τον κόσμο.";

const BoardGameDescription = () => {
  return (
    <div>
      <h6 style={{ color: 'var(--color-gray-purple)', textDecoration: 'underline' }}>Περιγραφή</h6>
      <p style={{ fontSize: '14px', color: 'var(--color-gray-purple)' }} dangerouslySetInnerHTML={{ __html: descriptionText }} />
    </div>
  );
};

export default BoardGameDescription;

export function buildCustomerNewReservationEmailHtml(reservation) {
  return `
    <div style="font-family: Arial, sans-serif; color: #222; background: #f7f7fa; padding: 32px;">
      <table style="max-width: 480px; margin: 0 auto; background: #fff; border-radius: 12px; box-shadow: 0 2px 12px #0001; border-collapse: separate; border-spacing: 0;">
        <tr>
          <td colspan="2" style="background: #E95C2F; color: #fff; border-radius: 12px 12px 0 0; padding: 24px 16px 16px 16px; text-align: center;">
            <h2 style="margin: 0; font-size: 1.5em;">Η κράτησή σας δημιουργήθηκε επιτυχώς!</h2>
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 16px; font-weight: bold; color: #E95C2F; background: #fff3ee;">Ημερομηνία:</td>
          <td style="padding: 12px 16px; background: #fff3ee;">${reservation.date}</td>
        </tr>
        <tr>
          <td style="padding: 12px 16px; font-weight: bold; color: #E95C2F;">Ώρα:</td>
          <td style="padding: 12px 16px;">${reservation.time}</td>
        </tr>
        <tr>
          <td style="padding: 12px 16px; font-weight: bold; color: #E95C2F; background: #fff3ee;">Αριθμός παικτών:</td>
          <td style="padding: 12px 16px; background: #fff3ee;">${reservation.players_no}</td>
        </tr>
        <tr>
          <td style="padding: 12px 16px; font-weight: bold; color: #E95C2F;">Επιτραπέζιο:</td>
          <td style="padding: 12px 16px;">${reservation.board_game_name - reservation.city || "Θα επιλεχθεί στο κατάστημα"}</td>
        </tr>
        <tr>
          <td style="padding: 12px 16px; font-weight: bold; color: #E95C2F; background: #fff3ee;">Καφέ:</td>
          <td style="padding: 12px 16px; background: #fff3ee;">${reservation.board_game_cafe_name}</td>
        </tr>
        <tr>
          <td style="padding: 12px 16px; font-weight: bold; color: #E95C2F;">Όνομα:</td>
          <td style="padding: 12px 16px;">${reservation.customer_first_name} ${reservation.customer_last_name}</td>
        </tr>
        <tr>
          <td style="padding: 12px 16px; font-weight: bold; color: #E95C2F; background: #fff3ee;">Τηλέφωνο:</td>
          <td style="padding: 12px 16px; background: #fff3ee;">${reservation.customer_phone}</td>
        </tr>
        <tr>
          <td colspan="2" style="background: #ffe5db; border-radius: 0 0 12px 12px; padding: 20px 16px; text-align: center;">
            <p style="margin: 12px 0 0 0; color: #E95C2F; font-weight: bold;">
            Η κράτησή σας βρίσκεται
            <span style="background: #E95C2F; color: #fff; padding: 1px 6px; border-radius: 4px; font-size: 1em; font-weight: bold; box-shadow: 0 2px 8px #E95C2F33; border: 1px solid #E95C2F; vertical-align: baseline; margin: 0 4px;">
                σε επεξεργασία
            </span>
            από το παιχνιδοκαφέ. Θα ενημερωθείτε σύντομα για την εξέλιξή της!
            </p>
          </td>
        </tr>
        <tr>
          <td colspan="2" style="background: #fff3ee; border-radius: 0 0 12px 12px; padding: 16px; text-align: center;">
            <div style="font-weight: bold; margin-bottom: 4px;">Στοιχεία καταστήματος:</div>
            <div style="color: #222;">Διεύθυνση: ${reservation.board_game_cafe_address}</div>
            <div style="color: #222;">Τηλέφωνο: ${reservation.board_game_cafe_phone}</div>
          </td>
        </tr>
      </table>
    </div>
  `;
}
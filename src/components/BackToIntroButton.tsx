import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react'; // นำเข้าไอคอนลูกศรย้อนกลับ

const BackToIntroButton: React.FC = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/Intro');
  };

  return (
    <button onClick={goHome} style={styles.button}>
      <ArrowLeft size={20} style={{ marginRight: '8px' }} />
    </button>
  );
};

// สไตล์ปุ่ม
const styles = {
  button: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#3e0001',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: '0.3s',
  } as React.CSSProperties
};

export default BackToIntroButton;

var Event = function(_event){
    var keycode = _event.which;
    var code = "";
    
    switch (keycode) {
        case 1:
        case 38: //other browsers
        case 65362: //��
            code = "KEY_UP";
            break;
        case 2:
        case 40: //other browsers
        case 65364: //��
            code = "KEY_DOWN";
            break;
        case 3:
        case 37: //other browsers
        case 65361: //��
            code = "KEY_LEFT";
            break;
        case 4:
        case 39: //other browsers
        case 65363: //��
            code = "KEY_RIGHT";
            break;
        case 13:
        case 65293: //ȷ��
            code = "KEY_SELECT";
            break;
        case 340:
        case 8: //other browsers
        case 27: //�ȸ���������ؼ�����ҳ�����⣬��ESC���ݴ�
        case 65367: //����
            code = "KEY_BACK";
            break;
        case 372:
       
        case 25: //��ǰ��ҳ
            code = "KEY_PAGE_UP";
            break;
        case 373:
       
        case 26: //���ҳ
            code = "KEY_PAGE_DOWN";
            break;
        case 513: //right [Ctrl]
        case 65360: //�˵�
            code = "KEY_MENU";
            break;
        case 595: //[+]
        case 63561: //������
            code = "KEY_VOLUME_UP";
            break;
        case 596: //[-]
        case 63562: //������
            code = "KEY_VOLUME_DOWN";
            break;
        case 597: //[.]
        case 63563: //����
            code = "KEY_VOLUME_MUTE";
            break;
        case 32:
            code = "KEY_F1";
            break;
        case 33:
            code = "KEY_F2";
            break;
        case 34:
            code = "KEY_F3";
            break;
        case 35:
            code = "KEY_F4";
            break;
        case 49:
            code = "KEY_NUMBER1";
            break;
        case 50:
            code = "KEY_NUMBER2";
            break;
        case 51:
            code = "KEY_NUMBER3";
            break;
        case 52:
            code = "KEY_NUMBER4";
            break;
        case 53:
            code = "KEY_NUMBER5";
            break;
        case 54:
            code = "KEY_NUMBER6";
            break;
        case 55:
            code = "KEY_NUMBER7";
            break;
        case 56:
            code = "KEY_NUMBER8";
            break;
        case 57:
            code = "KEY_NUMBER9";
            break;
        case 48:
            code = "KEY_NUMBER0";
            break;
        case 65307:
            code = "KEY_TRACK";
            break;
        case 36: // ϲ��
            code = "KEY_FAV";
            break;
        case 72: // �ؿ�
            code = "KEY_PALYBACK";
            break;
         
    }
	return code;
};

function $(id){
	return document.getElementById(id);
}

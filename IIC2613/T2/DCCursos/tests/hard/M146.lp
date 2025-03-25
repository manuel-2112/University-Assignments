cursos_pc(0..19).
cursos_major(0..9).

% Cursos del Plan Comun
pc_necesario("MAT1610", 0).
pc_necesario("MAT1620", 1).
pc_necesario("MAT1630", 2).
pc_necesario("MAT1640", 3).
pc_necesario("MAT1203", 4).
pc_necesario("QIM100E", 5).
pc_optativo("FIS1514", 6).
pc_optativo("ICE1514", 6).
pc_optativo("FIS1523", 7).
pc_optativo("IIQ1003", 7).
pc_optativo("IIQ103H", 7).
pc_necesario("FIS0154", 8).
pc_necesario("ICS1513", 9).
pc_necesario("IIC1103", 10).
pc_necesario("EYP1113", 11).
pc_optativo("FIS1533", 12).
pc_optativo("IEE1533", 12).
pc_necesario("FIS0152", 13).
pc_necesario("FIS0153", 14).
pc_necesario("ING2030", 15).
pc_optativo("BIO143M", 16).
pc_optativo("BIO110C", 16).
pc_optativo("BIO141C", 16).
pc_optativo("BIO135C", 16).
pc_necesario("ING1004", 17).
pc_necesario("LET0003", 18).
pc_necesario("FIL188", 19).

% Cursos del Major
major_necesario("ICS1113", 0).
major_necesario("IIQ2003", 1).
major_necesario("IIQ2043", 2).
major_necesario("IIQ2133", 3).
major_necesario("BIO151E", 4).
major_necesario("BIO228C", 5).
major_necesario("IIQ2673", 6).
major_necesario("IIQ2113", 7).
major_necesario("IBM2222", 8).
major_optativo("BIO297C", 9).
major_optativo("IIQ2693", 9).

% Cursos en dependencias
curso("MAT1610", 0).
curso("MAT1203", 0).
curso("FIS1513", 0).
curso("FIS1522", 0).
curso("FIZ010C", 0).
curso("MLM1120", 0).
curso("MLM1130", 0).
curso("FIZ020C", 0).
curso("MAT1419", 0).
curso("IEE1533", 2).
curso("FIS0152", 0).
curso("IIQ102E", 0).
curso("QIM102B", 0).
curso("MAT1506", 0).
curso("MAT1516", 0).
curso("MAT1511", 0).
curso("MAT1000", 0).
curso("ICE1003", 0).
curso("MAT1522", 0).
curso("QIM120", 0).
curso("QIM101L", 0).
curso("FIS109C", 0).
curso("MAT1199", 0).
curso("MAT1116", 0).
curso("MAT1109", 0).
curso("FIZ0211", 0).
curso("BIO135C", 0).
curso("MAT1004", 0).
curso("MAT1304", 0).
curso("IIQ1112", 0).
curso("MAT1206", 0).
curso("QIM200", 0).
curso("BIO141C", 0).
curso("FIZ010L", 0).
curso("FIZ1250", 0).
curso("MAT1492", 0).
curso("ICE1514", 0).
curso("ICH2304", 0).
curso("IPP1000", 0).
curso("ICM1022", 0).
curso("FIS1512", 0).
curso("MAT1136", 0).
curso("MAT230E", 0).
curso("ING1011", 0).
curso("IIQ2683", 0).
curso("MAT1124", 0).
curso("FIZ121", 0).
curso("IMT2230", 0).
curso("MAT1491", 0).
curso("QIM103A", 0).
curso("FIZ0221", 0).
curso("MAT1306", 0).
curso("QIM102", 0).
curso("MAT1115", 0).
curso("IMT2210", 0).
curso("MAT1204", 0).
curso("MAT1104", 0).
curso("QIM115", 0).
curso("FIZ121A", 0).
curso("IIQ2673", 1).
curso("FIS1503", 0).
curso("EDU024M", 0).
curso("MAT113G", 0).
curso("MAT1202", 0).
curso("IIQ2003", 0).
curso("FIZ221L", 0).
curso("FIS1523", 0).
curso("IIQ2043", 1).
curso("IIQ2693", 2).
curso("MAT1215", 0).
curso("QQO2203", 0).
curso("FIZ1111", 0).
curso("IBM2222", 2).
curso("ICS1513", 0).
curso("IIQ1003", 0).
curso("FIZ010", 0).
curso("MAT1216", 0).
curso("MAT1114", 0).
curso("QIM114", 0).
curso("ING1004", 0).
curso("QIM100B", 0).
curso("MAT1214", 0).
curso("IIQ1002", 0).
curso("IMT2220", 0).
curso("FIS1514", 0).
curso("MAT1630", 0).
curso("MAT1070", 0).
curso("FIS0153", 0).
curso("MEB103F", 0).
curso("MAT1512", 0).
curso("MAT1600", 0).
curso("MAT110E", 0).
curso("MAT1503", 0).
curso("QIM202", 0).
curso("BIO151C", 0).
curso("MAT1409", 0).
curso("MEB103E", 0).
curso("MAT1620", 0).
curso("MAT1125", 0).
curso("BIO152C", 0).
curso("QIM100F", 0).
curso("FIS0154", 0).
curso("FIZ121L", 0).
curso("MAT0006", 0).
curso("QUG1002", 0).
curso("MAT1207", 0).
curso("ICS1113", 0).
curso("MAT117S", 0).
curso("BIO141", 0).
curso("MLM1310", 0).
curso("QIM100P", 0).
curso("IIQ2113", 2).
curso("MAT1502", 0).
curso("BIO143M", 2).
curso("MAT2023", 0).
curso("FIS1511", 0).
curso("MAT2013", 0).
curso("BIO166", 0).
curso("MAT1012", 0).
curso("QIM100A", 0).
curso("MAT1102", 0).
curso("ICM1003", 0).
curso("BIO297C", 0).
curso("ICE1013", 0).
curso("MAT1103", 0).
curso("QIM106", 0).
curso("IIQ103H", 0).
curso("FIS1533", 0).
curso("MAT1408", 0).
curso("QIM201A", 0).
curso("MAT1501", 0).
curso("MAT2012", 0).
curso("LET0003", 0).
curso("QIM109", 0).
curso("ICE1513", 0).
curso("IIC1103", 0).
curso("FIS154D", 0).
curso("MAT1107", 0).
curso("FIS1532", 0).
curso("MAT1106", 0).
curso("MAT1305", 0).
curso("MAT1490", 0).
curso("BIO100", 0).
curso("FIZ1010", 0).
curso("BIO100B", 0).
curso("BIO228C", 1).
curso("MAT1532", 0).
curso("FIS510L", 0).
curso("FIZ020", 0).
curso("QIM101", 0).
curso("FIZ1100", 0).
curso("FIL188", 0).
curso("MED821", 0).
curso("MAT210E", 0).
curso("FIS1510", 0).
curso("QIM114B", 0).
curso("MAT1135", 0).
curso("EYP1113", 0).
curso("MAT1523", 0).
curso("MLM1300", 0).
curso("FIS119E", 0).
curso("MLM1110", 0).
curso("QIM102A", 0).
curso("MLM1100", 0).
curso("QIM100E", 0).
curso("BIO110C", 0).
curso("MAT1316", 0).
curso("QUG1001", 0).
curso("MEE200E", 0).
curso("EDU024F", 0).
curso("MAT1100", 0).
curso("FIS0109", 0).
curso("BIO136C", 0).
curso("QQF2501", 0).
curso("ICH1104", 0).
curso("MAT117G", 0).
curso("FIZ1300", 0).
curso("FIZ0123", 0).
curso("BIO151E", 0).
curso("MAT1023", 0).
curso("FIZ020L", 0).
curso("FIZ221A", 0).
curso("MAT1289", 0).
curso("MAT1640", 0).
curso("IIQ2133", 0).
curso("QIM101Q", 0).
curso("QIM100", 0).
curso("ING2030", 0).
curso("ICH1303", 0).
curso("QIM201G", 0).
curso("FIZ0121", 0).
curso("MAT1126", 0).
curso("QIM100I", 0).
curso("MAT1315", 0).
curso("MAT220E", 0).
curso("ICH2314", 0).

% Cursos y requisitos
requisito("FIS1513", 0, 0, 0, "FIS1503").
requisito("FIS1513", 0, 1, 0, "MAT1203").
correquisito("FIS1513", 0, 2, 0, "MAT1620").
correquisito("FIS1513", 1, 0, 0, "MAT1203").
requisito("FIS1513", 1, 1, 0, "MAT1610").
requisito("FIS1522", 0, 0, 0, "FIS1512").
requisito("FIS1522", 0, 1, 0, "MAT1512").
requisito("FIS1522", 1, 0, 0, "ICE1013").
requisito("FIS1522", 1, 1, 0, "MAT1512").
correquisito("FIZ010C", 0, 0, 0, "FIZ010L").
requisito("MLM1120", 0, 0, 0, "MLM1110").
requisito("FIZ020C", 0, 0, 0, "FIZ010C").
correquisito("FIZ020C", 0, 1, 0, "FIZ020L").
correquisito("FIZ020C", 1, 0, 0, "FIZ020L").
requisito("FIZ020C", 1, 1, 0, "FIZ1111").
correquisito("IEE1533", 0, 0, 0, "FIS0153").
requisito("IEE1533", 0, 1, 0, "MAT1630").
requisito("IEE1533", 0, 1, 1, "MAT1523").
requisito("IEE1533", 0, 1, 2, "MAT230E").
requisito("IEE1533", 0, 1, 3, "MLM1130").
correquisito("FIS0152", 0, 0, 0, "FIS1523").
correquisito("FIS0152", 0, 0, 1, "IIQ1003").
correquisito("FIS0152", 0, 0, 2, "ICM1003").
correquisito("FIS0152", 0, 0, 3, "IIQ103H").
requisito("IIQ102E", 0, 0, 0, "FIS1522").
requisito("IIQ102E", 0, 1, 0, "QIM100").
requisito("QIM102B", 0, 0, 0, "QIM100").
requisito("QIM102B", 1, 0, 0, "QIM100A").
requisito("QIM102B", 2, 0, 0, "QIM109").
requisito("QIM102B", 3, 0, 0, "QIM100P").
requisito("QIM102B", 4, 0, 0, "QIM100B").
requisito("MAT1506", 0, 0, 0, "MAT110E").
requisito("MAT1506", 1, 0, 0, "MAT117G").
requisito("MAT1506", 2, 0, 0, "MAT1409").
requisito("MAT1506", 3, 0, 0, "MAT1490").
requisito("MAT1506", 4, 0, 0, "MAT1491").
requisito("MAT1506", 5, 0, 0, "MAT1492").
requisito("MAT1506", 6, 0, 0, "MAT1004").
requisito("MAT1506", 7, 0, 0, "MAT1600").
requisito("MAT1506", 8, 0, 0, "MAT1012").
requisito("MAT1506", 9, 0, 0, "MAT1289").
requisito("MAT1506", 10, 0, 0, "MAT1000").
requisito("MAT1506", 11, 0, 0, "MAT1023").
requisito("MAT1516", 0, 0, 0, "MAT113G").
requisito("MAT1516", 1, 0, 0, "MAT1419").
requisito("MAT1516", 2, 0, 0, "MAT1501").
requisito("MAT1516", 3, 0, 0, "MAT1502").
requisito("MAT1516", 4, 0, 0, "MAT1503").
requisito("MAT1516", 5, 0, 0, "MAT1506").
requisito("MAT1516", 6, 0, 0, "MAT1100").
requisito("ICE1003", 0, 0, 0, "MAT1102").
requisito("ICE1003", 0, 1, 0, "MAT1503").
correquisito("FIS109C", 0, 0, 0, "FIS0109").
requisito("MAT1199", 0, 0, 0, "MAT1289").
requisito("MAT1199", 1, 0, 0, "MAT1004").
requisito("MAT1199", 2, 0, 0, "MAT110E").
requisito("MAT1199", 3, 0, 0, "MAT1600").
requisito("MAT1199", 4, 0, 0, "MAT1012").
requisito("MAT1199", 5, 0, 0, "MAT1492").
requisito("MAT1199", 6, 0, 0, "MAT1000").
requisito("MAT1199", 7, 0, 0, "MAT1409").
requisito("MAT1199", 8, 0, 0, "MAT1023").
requisito("MAT1116", 0, 0, 0, "MAT1106").
requisito("MAT1116", 1, 0, 0, "MAT1115").
requisito("MAT1116", 2, 0, 0, "MAT1305").
requisito("MAT1116", 3, 0, 0, "MAT1104").
requisito("MAT1116", 4, 0, 0, "MAT1107").
requisito("FIZ0211", 0, 0, 0, "FIZ0121").
requisito("FIZ0211", 0, 1, 0, "MAT1103").
requisito("FIZ0211", 0, 2, 0, "MAT1630").
requisito("FIZ0211", 1, 0, 0, "FIZ0123").
requisito("FIZ0211", 1, 1, 0, "MAT1103").
correquisito("FIZ0211", 1, 2, 0, "MAT1136").
requisito("BIO135C", 0, 0, 0, "BIO141C").
requisito("BIO135C", 1, 0, 0, "MEB103F").
requisito("BIO135C", 2, 0, 0, "BIO136C").
requisito("BIO135C", 2, 1, 0, "MEB103E").
correquisito("BIO135C", 2, 2, 0, "MEE200E").
requisito("BIO135C", 3, 0, 0, "BIO152C").
requisito("IIQ1112", 0, 0, 0, "QIM115").
requisito("IIQ1112", 1, 0, 0, "IIQ102E").
requisito("IIQ1112", 2, 0, 0, "IIQ1002").
requisito("QIM200", 0, 0, 0, "QIM100").
requisito("QIM200", 1, 0, 0, "QUG1002").
requisito("QIM200", 2, 0, 0, "QUG1001").
requisito("QIM200", 3, 0, 0, "QIM100A").
requisito("QIM200", 4, 0, 0, "QIM100").
requisito("QIM200", 4, 1, 0, "QIM101").
requisito("QIM200", 5, 0, 0, "QIM100E").
correquisito("FIZ010L", 0, 0, 0, "FIZ010C").
correquisito("FIZ010L", 1, 0, 0, "FIS1510").
correquisito("FIZ010L", 2, 0, 0, "FIZ010").
correquisito("FIZ010L", 3, 0, 0, "FIZ1111").
requisito("FIZ1250", 0, 0, 0, "FIZ1100").
requisito("FIZ1250", 0, 1, 0, "MAT1512").
correquisito("ICE1514", 0, 0, 0, "FIS0154").
requisito("ICE1514", 0, 1, 0, "MAT1610").
correquisito("ICE1514", 0, 2, 0, "MAT1203").
requisito("ICE1514", 0, 2, 1, "IMT2210").
correquisito("ICH2304", 0, 0, 0, "MAT1640").
requisito("ICH2304", 0, 1, 0, "QIM100A").
correquisito("ICH2304", 1, 0, 0, "MAT1640").
requisito("ICH2304", 1, 1, 0, "QIM100E").
requisito("ICM1022", 0, 0, 0, "FIS1512").
correquisito("ICM1022", 0, 1, 0, "MAT1532").
requisito("ICM1022", 1, 0, 0, "ICE1013").
correquisito("ICM1022", 1, 1, 0, "MAT1532").
requisito("FIS1512", 0, 0, 0, "MAT1503").
correquisito("FIS1512", 0, 1, 0, "MAT1512").
requisito("FIS1512", 1, 0, 0, "MAT1102").
requisito("FIS1512", 1, 1, 0, "MAT1503").
requisito("FIS1512", 2, 0, 0, "MLM1110").
correquisito("FIS1512", 3, 0, 0, "MLM1120").
requisito("MAT1136", 0, 0, 0, "MAT1126").
requisito("MAT1136", 0, 1, 0, "MAT0006").
requisito("MAT1136", 0, 1, 1, "EDU024M").
requisito("MAT1136", 0, 1, 2, "EDU024F").
requisito("MAT230E", 0, 0, 0, "MAT220E").
requisito("IIQ2683", 0, 0, 0, "BIO228C").
requisito("IIQ2683", 1, 0, 0, "IIQ2113").
requisito("IIQ2683", 1, 1, 0, "QIM202").
requisito("MAT1124", 0, 0, 0, "MAT1114").
requisito("MAT1124", 1, 0, 0, "MAT1116").
requisito("MAT1124", 2, 0, 0, "MAT1610").
correquisito("FIZ121", 0, 0, 0, "FIZ121L").
requisito("FIZ121", 0, 1, 0, "MAT1610").
correquisito("FIZ121", 0, 2, 0, "MAT1620").
correquisito("FIZ121", 1, 0, 0, "FIZ121L").
requisito("FIZ121", 1, 1, 0, "MAT1115").
correquisito("FIZ121", 2, 0, 0, "FIZ121L").
correquisito("FIZ121", 2, 1, 0, "MLM1110").
correquisito("FIZ121", 3, 0, 0, "FIZ121L").
correquisito("FIZ121", 3, 1, 0, "MAT220E").
correquisito("FIZ121", 4, 0, 0, "FIZ121L").
correquisito("FIZ121", 4, 1, 0, "MAT1620").
correquisito("FIZ121", 5, 0, 0, "FIZ121L").
correquisito("FIZ121", 5, 1, 0, "MAT1126").
requisito("IMT2230", 0, 0, 0, "MAT1610").
requisito("IMT2230", 0, 0, 1, "MAT1116").
requisito("IMT2230", 0, 0, 2, "MAT1114").
requisito("IMT2230", 0, 1, 0, "IMT2210").
requisito("QIM103A", 0, 0, 0, "QIM102").
requisito("QIM103A", 1, 0, 0, "QIM102A").
requisito("QIM103A", 2, 0, 0, "QIM102B").
requisito("QIM103A", 3, 0, 0, "QQO2203").
requisito("FIZ0221", 0, 0, 0, "FIZ0121").
correquisito("FIZ0221", 0, 1, 0, "FIZ221L").
requisito("FIZ0221", 0, 2, 0, "MAT1630").
requisito("FIZ0221", 1, 0, 0, "FIZ0123").
correquisito("FIZ0221", 1, 1, 0, "FIZ221L").
requisito("FIZ0221", 1, 2, 0, "MAT1630").
requisito("FIZ0221", 2, 0, 0, "FIZ0121").
correquisito("FIZ0221", 2, 1, 0, "FIZ221L").
requisito("FIZ0221", 2, 2, 0, "MAT1136").
requisito("FIZ0221", 3, 0, 0, "FIZ0123").
correquisito("FIZ0221", 3, 1, 0, "FIZ221L").
requisito("FIZ0221", 3, 2, 0, "MAT1136").
requisito("QIM102", 0, 0, 0, "QIM100").
requisito("QIM102", 1, 0, 0, "QIM120").
requisito("IMT2210", 0, 0, 0, "IIC1103").
requisito("IMT2210", 0, 1, 0, "MAT1107").
requisito("IMT2210", 0, 1, 1, "MAT1106").
requisito("IMT2210", 0, 2, 0, "MAT1207").
requisito("IMT2210", 0, 2, 1, "MAT1206").
requisito("IMT2210", 0, 2, 2, "MAT1306").
requisito("QIM115", 0, 0, 0, "QIM114").
requisito("QIM115", 1, 0, 0, "QIM114B").
requisito("QIM115", 2, 0, 0, "QQF2501").
requisito("IIQ2673", 0, 0, 0, "IIQ2133").
requisito("IIQ2673", 0, 1, 0, "ICH1104").
requisito("IIQ2673", 0, 1, 1, "IIQ2003").
requisito("MAT1202", 0, 0, 0, "MAT1102").
requisito("MAT1202", 1, 0, 0, "MAT1305").
requisito("MAT1202", 2, 0, 0, "MLM1300").
requisito("IIQ2003", 0, 0, 0, "MAT1640").
correquisito("IIQ2003", 0, 1, 0, "IIQ2133").
correquisito("IIQ2003", 0, 1, 1, "ICH2314").
requisito("IIQ2003", 0, 1, 2, "QIM115").
correquisito("FIZ221L", 0, 0, 0, "FIZ0221").
correquisito("FIZ221L", 1, 0, 0, "FIS1533").
correquisito("FIZ221L", 2, 0, 0, "FIZ1300").
correquisito("FIZ221L", 3, 0, 0, "FIZ221A").
correquisito("FIS1523", 0, 0, 0, "FIS0152").
correquisito("FIS1523", 0, 1, 0, "MAT1630").
correquisito("FIS1523", 1, 0, 0, "FIS0152").
correquisito("FIS1523", 1, 1, 0, "MAT1523").
correquisito("FIS1523", 2, 0, 0, "FIS0152").
requisito("FIS1523", 2, 1, 0, "FIS1512").
requisito("FIS1523", 2, 2, 0, "ING1011").
requisito("FIS1523", 2, 3, 0, "MAT1512").
correquisito("FIS1523", 3, 0, 0, "FIS0152").
requisito("FIS1523", 3, 1, 0, "FIS1512").
requisito("FIS1523", 3, 2, 0, "IPP1000").
requisito("FIS1523", 3, 3, 0, "MAT1512").
correquisito("FIS1523", 4, 0, 0, "FIS0152").
requisito("FIS1523", 4, 1, 0, "ICE1013").
requisito("FIS1523", 4, 2, 0, "ING1011").
requisito("FIS1523", 4, 3, 0, "MAT1512").
correquisito("FIS1523", 5, 0, 0, "FIS0152").
requisito("FIS1523", 5, 1, 0, "ICE1013").
requisito("FIS1523", 5, 2, 0, "IPP1000").
requisito("FIS1523", 5, 3, 0, "MAT1512").
correquisito("FIS1523", 6, 0, 0, "FIS0152").
requisito("FIS1523", 6, 1, 0, "FIS1522").
requisito("FIS1523", 6, 2, 0, "ING1011").
requisito("FIS1523", 6, 3, 0, "QIM100").
correquisito("FIS1523", 7, 0, 0, "FIS0152").
requisito("FIS1523", 7, 1, 0, "FIS1522").
requisito("FIS1523", 7, 2, 0, "IPP1000").
requisito("FIS1523", 7, 3, 0, "QIM100").
requisito("IIQ2043", 0, 0, 0, "FIS1523").
requisito("IIQ2043", 0, 1, 0, "QIM100A").
requisito("IIQ2043", 1, 0, 0, "IIQ1003").
requisito("IIQ2043", 1, 1, 0, "QIM100A").
requisito("IIQ2043", 2, 0, 0, "ICM1003").
requisito("IIQ2043", 2, 1, 0, "QIM100A").
requisito("IIQ2043", 3, 0, 0, "IIQ1002").
requisito("IIQ2043", 3, 1, 0, "ING1011").
requisito("IIQ2043", 4, 0, 0, "IIQ1002").
requisito("IIQ2043", 4, 1, 0, "IPP1000").
requisito("IIQ2043", 5, 0, 0, "FIZ0211").
requisito("IIQ2043", 5, 1, 0, "QIM100A").
requisito("IIQ2043", 6, 0, 0, "FIS1523").
requisito("IIQ2043", 6, 1, 0, "QIM100E").
requisito("IIQ2043", 7, 0, 0, "IIQ1003").
requisito("IIQ2043", 7, 1, 0, "QIM100E").
requisito("IIQ2043", 8, 0, 0, "IIQ103H").
requisito("IIQ2043", 8, 1, 0, "QIM100E").
requisito("IIQ2043", 9, 0, 0, "ICM1003").
requisito("IIQ2043", 9, 1, 0, "QIM100E").
requisito("IIQ2043", 10, 0, 0, "FIZ0211").
requisito("IIQ2043", 10, 1, 0, "QIM100E").
requisito("IIQ2043", 11, 0, 0, "IIQ103H").
requisito("IIQ2043", 11, 1, 0, "QIM100A").
requisito("IIQ2693", 0, 0, 0, "BIO151C").
requisito("IIQ2693", 1, 0, 0, "BIO151E").
requisito("MAT1215", 0, 0, 0, "MAT1206").
requisito("MAT1215", 1, 0, 0, "MAT1207").
requisito("MAT1215", 2, 0, 0, "MAT1204").
requisito("MAT1215", 3, 0, 0, "MAT1216").
requisito("MAT1215", 4, 0, 0, "MAT1214").
requisito("MAT1215", 5, 0, 0, "MAT1315").
requisito("MAT1215", 6, 0, 0, "MAT1316").
requisito("MAT1215", 7, 0, 0, "MLM1310").
requisito("MAT1215", 8, 0, 0, "MAT1203").
requisito("IBM2222", 0, 0, 0, "IIQ2113").
requisito("IBM2222", 0, 1, 0, "IIQ2673").
requisito("IBM2222", 0, 2, 0, "IIQ2693").
requisito("IBM2222", 1, 0, 0, "BIO297C").
requisito("IBM2222", 1, 1, 0, "IIQ2113").
requisito("IBM2222", 1, 2, 0, "IIQ2673").
requisito("IBM2222", 2, 0, 0, "IIQ2673").
requisito("IBM2222", 2, 1, 0, "IIQ2683").
requisito("IBM2222", 2, 2, 0, "IIQ2693").
requisito("IBM2222", 3, 0, 0, "BIO297C").
requisito("IBM2222", 3, 1, 0, "IIQ2673").
requisito("IBM2222", 3, 2, 0, "IIQ2683").
correquisito("ICS1513", 0, 0, 0, "MAT1620").
requisito("ICS1513", 1, 0, 0, "IMT2220").
correquisito("IIQ1003", 0, 0, 0, "FIS0152").
correquisito("IIQ1003", 0, 1, 0, "MAT1630").
requisito("IIQ1003", 1, 0, 0, "FIS1512").
requisito("IIQ1003", 1, 1, 0, "ING1011").
requisito("IIQ1003", 1, 2, 0, "MAT1512").
requisito("IIQ1003", 2, 0, 0, "FIS1512").
requisito("IIQ1003", 2, 1, 0, "IPP1000").
requisito("IIQ1003", 2, 2, 0, "MAT1512").
requisito("IIQ1003", 3, 0, 0, "ICE1013").
requisito("IIQ1003", 3, 1, 0, "IPP1000").
requisito("IIQ1003", 3, 2, 0, "MAT1512").
requisito("IIQ1003", 4, 0, 0, "ICE1013").
requisito("IIQ1003", 4, 1, 0, "ING1011").
requisito("IIQ1003", 4, 2, 0, "MAT1512").
requisito("IIQ1003", 5, 0, 0, "FIS1522").
requisito("IIQ1003", 5, 1, 0, "ING1011").
requisito("IIQ1003", 5, 2, 0, "QIM100").
requisito("IIQ1003", 6, 0, 0, "FIS1522").
requisito("IIQ1003", 6, 1, 0, "IPP1000").
requisito("IIQ1003", 6, 2, 0, "QIM100").
correquisito("IIQ1003", 7, 0, 0, "FIS0152").
requisito("IIQ1003", 7, 1, 0, "IMT2220").
requisito("IIQ1003", 7, 2, 0, "IMT2230").
requisito("MAT1216", 0, 0, 0, "MAT1305").
requisito("MAT1216", 1, 0, 0, "MAT1306").
requisito("MAT1216", 2, 0, 0, "MAT1304").
requisito("MAT1114", 0, 0, 0, "MAT1104").
requisito("MAT1114", 1, 0, 0, "MAT1106").
requisito("QIM114", 0, 0, 0, "FIZ1111").
requisito("QIM114", 0, 1, 0, "MLM1110").
requisito("QIM114", 1, 0, 0, "FIZ020C").
requisito("QIM114", 1, 1, 0, "MAT1516").
requisito("QIM114", 2, 0, 0, "MAT1506").
requisito("QIM100B", 0, 0, 0, "QIM100I").
requisito("QIM100B", 0, 0, 1, "QIM100").
requisito("QIM100B", 0, 0, 2, "QIM109").
requisito("QIM100B", 0, 1, 0, "QIM101Q").
requisito("QIM100B", 0, 1, 1, "QIM101").
requisito("QIM100B", 0, 1, 2, "QIM120").
requisito("QIM100B", 0, 1, 3, "QIM101L").
requisito("MAT1214", 0, 0, 0, "MAT1204").
requisito("MAT1214", 0, 0, 1, "MAT1206").
requisito("MAT1214", 0, 0, 2, "MAT1207").
requisito("MAT1214", 0, 1, 0, "MAT1304").
requisito("MAT1214", 0, 1, 1, "MAT1306").
requisito("IIQ1002", 0, 0, 0, "FIS1522").
requisito("IIQ1002", 0, 1, 0, "QIM100").
requisito("IMT2220", 0, 0, 0, "MAT1610").
requisito("IMT2220", 0, 0, 1, "MAT1116").
requisito("IMT2220", 0, 0, 2, "MAT1114").
correquisito("IMT2220", 0, 1, 0, "IMT2210").
correquisito("FIS1514", 0, 0, 0, "FIS0154").
correquisito("FIS1514", 0, 1, 0, "MAT1203").
requisito("FIS1514", 0, 2, 0, "MAT1610").
requisito("MAT1630", 0, 0, 0, "MAT1203").
requisito("MAT1630", 0, 1, 0, "MAT1620").
correquisito("FIS0153", 0, 0, 0, "FIS1533").
correquisito("FIS0153", 1, 0, 0, "FIS1532").
correquisito("FIS0153", 2, 0, 0, "FIZ0221").
correquisito("FIS0153", 3, 0, 0, "IEE1533").
requisito("MAT1512", 0, 0, 0, "MAT1503").
requisito("QIM202", 0, 0, 0, "QIM200").
requisito("QIM202", 1, 0, 0, "QIM103A").
requisito("QIM202", 2, 0, 0, "QIM201G").
requisito("QIM202", 3, 0, 0, "QIM201A").
requisito("BIO151C", 0, 0, 0, "BIO166").
requisito("BIO151C", 0, 1, 0, "QIM200").
requisito("BIO151C", 1, 0, 0, "BIO141C").
requisito("BIO151C", 1, 1, 0, "QIM102").
requisito("BIO151C", 2, 0, 0, "BIO141C").
requisito("BIO151C", 2, 1, 0, "QIM200").
requisito("BIO151C", 3, 0, 0, "BIO141C").
requisito("BIO151C", 3, 1, 0, "QIM102").
requisito("BIO151C", 4, 0, 0, "BIO141C").
requisito("BIO151C", 4, 1, 0, "QIM102").
requisito("BIO151C", 5, 0, 0, "BIO141C").
requisito("BIO151C", 5, 1, 0, "QIM200").
requisito("MAT1620", 0, 0, 0, "MAT1610").
requisito("MAT1125", 0, 0, 0, "MAT1106").
requisito("MAT1125", 1, 0, 0, "MAT1115").
requisito("MAT1125", 2, 0, 0, "MAT1116").
requisito("MAT1125", 3, 0, 0, "MAT1114").
requisito("MAT1125", 4, 0, 0, "MAT1502").
requisito("MAT1125", 5, 0, 0, "MAT1503").
requisito("MAT1125", 6, 0, 0, "MLM1100").
requisito("MAT1125", 7, 0, 0, "MAT1610").
requisito("BIO152C", 0, 0, 0, "BIO141C").
requisito("BIO152C", 0, 1, 0, "FIS109C").
requisito("BIO152C", 0, 2, 0, "MAT1492").
requisito("BIO152C", 0, 3, 0, "QIM100").
requisito("BIO152C", 1, 0, 0, "BIO141C").
requisito("BIO152C", 1, 1, 0, "FIS109C").
requisito("BIO152C", 1, 2, 0, "MAT1492").
requisito("BIO152C", 1, 3, 0, "QIM100I").
requisito("BIO152C", 2, 0, 0, "BIO141C").
requisito("BIO152C", 2, 1, 0, "FIS1503").
requisito("BIO152C", 2, 2, 0, "MAT1600").
requisito("BIO152C", 2, 3, 0, "QIM100").
requisito("BIO152C", 3, 0, 0, "BIO141C").
requisito("BIO152C", 3, 1, 0, "FIS1503").
requisito("BIO152C", 3, 2, 0, "MAT1600").
requisito("BIO152C", 3, 3, 0, "QIM100A").
requisito("BIO152C", 4, 0, 0, "BIO141C").
requisito("BIO152C", 4, 1, 0, "FIS1503").
requisito("BIO152C", 4, 2, 0, "MAT1600").
requisito("BIO152C", 4, 3, 0, "QIM100I").
requisito("BIO152C", 5, 0, 0, "BIO141C").
requisito("BIO152C", 5, 1, 0, "FIS109C").
requisito("BIO152C", 5, 2, 0, "MAT1492").
requisito("BIO152C", 5, 3, 0, "QIM100I").
requisito("BIO152C", 6, 0, 0, "BIO141C").
requisito("BIO152C", 6, 1, 0, "FIS1513").
requisito("BIO152C", 6, 2, 0, "MAT1610").
requisito("BIO152C", 6, 3, 0, "QIM100A").
requisito("BIO152C", 7, 0, 0, "BIO141C").
requisito("BIO152C", 7, 1, 0, "FIS1503").
requisito("BIO152C", 7, 2, 0, "MAT1600").
requisito("BIO152C", 7, 3, 0, "QIM100E").
requisito("BIO152C", 8, 0, 0, "BIO141C").
requisito("BIO152C", 8, 1, 0, "FIS1513").
requisito("BIO152C", 8, 2, 0, "MAT1610").
requisito("BIO152C", 8, 3, 0, "QIM100E").
requisito("BIO152C", 9, 0, 0, "BIO141C").
requisito("BIO152C", 9, 1, 0, "FIS1514").
requisito("BIO152C", 9, 2, 0, "MAT1610").
requisito("BIO152C", 9, 3, 0, "QIM100A").
requisito("BIO152C", 10, 0, 0, "BIO141C").
requisito("BIO152C", 10, 1, 0, "FIS1514").
requisito("BIO152C", 10, 2, 0, "MAT1610").
requisito("BIO152C", 10, 3, 0, "QIM100E").
correquisito("FIS0154", 0, 0, 0, "FIS1514").
correquisito("FIS0154", 1, 0, 0, "ICE1514").
correquisito("FIS0154", 2, 0, 0, "FIS1513").
correquisito("FIS0154", 3, 0, 0, "ICE1513").
correquisito("FIS0154", 4, 0, 0, "ICE1003").
correquisito("FIS0154", 5, 0, 0, "ICM1022").
correquisito("FIS0154", 6, 0, 0, "FIS154D").
correquisito("FIZ121L", 0, 0, 0, "FIZ0121").
correquisito("FIZ121L", 1, 0, 0, "FIZ121").
correquisito("FIZ121L", 2, 0, 0, "FIS1512").
correquisito("FIZ121L", 3, 0, 0, "FIZ1100").
correquisito("FIZ121L", 4, 0, 0, "FIZ121A").
correquisito("FIZ121L", 5, 0, 0, "ICE1013").
requisito("ICS1113", 0, 0, 0, "MAT1203").
requisito("ICS1113", 0, 1, 0, "MAT1620").
requisito("ICS1113", 0, 1, 1, "MAT1202").
requisito("ICS1113", 0, 2, 0, "MAT1523").
requisito("ICS1113", 0, 2, 1, "MAT1135").
requisito("ICS1113", 0, 3, 0, "MAT1215").
requisito("ICS1113", 0, 4, 0, "IIC1103").
requisito("MLM1310", 0, 0, 0, "MAT1102").
requisito("MLM1310", 1, 0, 0, "MAT1109").
requisito("MLM1310", 2, 0, 0, "MAT1305").
requisito("MLM1310", 3, 0, 0, "MAT2012").
requisito("MLM1310", 4, 0, 0, "MLM1300").
correquisito("IIQ2113", 0, 0, 0, "IIQ1112").
correquisito("IIQ2113", 1, 0, 0, "IIQ2133").
requisito("BIO143M", 0, 0, 0, "MAT1000").
requisito("BIO143M", 1, 0, 0, "MAT1610").
requisito("FIS1511", 0, 0, 0, "MAT1408").
requisito("FIS1511", 1, 0, 0, "MAT1409").
requisito("FIS1511", 2, 0, 0, "MAT110E").
requisito("FIS1511", 3, 0, 0, "MAT1000").
requisito("FIS1511", 4, 0, 0, "MAT1023").
requisito("QIM100A", 0, 0, 0, "QIM100I").
requisito("QIM100A", 0, 1, 0, "QIM101Q").
correquisito("ICM1003", 0, 0, 0, "FIS0152").
correquisito("ICM1003", 0, 1, 0, "MAT1523").
correquisito("ICM1003", 0, 1, 1, "MAT1630").
correquisito("ICM1003", 0, 1, 2, "MAT230E").
correquisito("ICM1003", 0, 1, 3, "MLM1130").
requisito("ICM1003", 1, 0, 0, "IMT2220").
requisito("ICM1003", 1, 1, 0, "IMT2230").
requisito("BIO297C", 0, 0, 0, "BIO151E").
requisito("BIO297C", 0, 1, 0, "QIM200").
requisito("BIO297C", 1, 0, 0, "BIO151E").
requisito("BIO297C", 1, 1, 0, "QIM102A").
requisito("ICE1013", 0, 0, 0, "MAT1102").
requisito("ICE1013", 0, 1, 0, "MAT1503").
requisito("QIM106", 0, 0, 0, "QIM100").
requisito("QIM106", 1, 0, 0, "QIM120").
correquisito("IIQ103H", 0, 0, 0, "FIS0152").
correquisito("IIQ103H", 0, 1, 0, "MAT1630").
correquisito("IIQ103H", 0, 1, 1, "MAT1523").
correquisito("IIQ103H", 0, 1, 2, "MAT230E").
correquisito("IIQ103H", 0, 1, 3, "MLM1130").
requisito("IIQ103H", 1, 0, 0, "IMT2220").
requisito("IIQ103H", 1, 1, 0, "IMT2230").
correquisito("IIQ103H", 1, 2, 0, "FIS0152").
correquisito("FIS1533", 0, 0, 0, "FIS0153").
requisito("FIS1533", 0, 1, 0, "MAT1630").
requisito("QIM109", 0, 0, 0, "QIM106").
requisito("QIM109", 1, 0, 0, "QIM100").
correquisito("ICE1513", 0, 0, 0, "MAT1203").
requisito("ICE1513", 0, 1, 0, "MAT1610").
requisito("ICE1513", 1, 0, 0, "FIS1512").
requisito("ICE1513", 1, 1, 0, "ING1011").
requisito("ICE1513", 1, 2, 0, "MAT1203").
correquisito("ICE1513", 1, 3, 0, "MAT1620").
requisito("ICE1513", 2, 0, 0, "ICE1013").
requisito("ICE1513", 2, 1, 0, "ING1011").
requisito("ICE1513", 2, 2, 0, "MAT1203").
correquisito("ICE1513", 2, 3, 0, "MAT1620").
requisito("ICE1513", 3, 0, 0, "FIS1512").
requisito("ICE1513", 3, 1, 0, "IPP1000").
requisito("ICE1513", 3, 2, 0, "MAT1203").
correquisito("ICE1513", 3, 3, 0, "MAT1620").
requisito("ICE1513", 4, 0, 0, "ICE1013").
requisito("ICE1513", 4, 1, 0, "IPP1000").
requisito("ICE1513", 4, 2, 0, "MAT1203").
correquisito("ICE1513", 4, 3, 0, "MAT1620").
requisito("FIS154D", 0, 0, 0, "IMT2220").
requisito("FIS154D", 0, 1, 0, "IMT2230").
requisito("FIS1532", 0, 0, 0, "MAT1522").
requisito("FIS1532", 1, 0, 0, "MAT1523").
requisito("FIS1532", 2, 0, 0, "MAT1630").
requisito("BIO228C", 0, 0, 0, "BIO151C").
requisito("BIO228C", 1, 0, 0, "BIO151E").
requisito("BIO228C", 2, 0, 0, "QIM200").
requisito("MAT1532", 0, 0, 0, "MAT1202").
requisito("MAT1532", 0, 1, 0, "MAT1512").
requisito("MAT1532", 1, 0, 0, "MAT1202").
requisito("MAT1532", 2, 0, 0, "MAT1203").
requisito("MAT1532", 2, 1, 0, "MAT1620").
requisito("MAT1532", 3, 0, 0, "MAT1512").
correquisito("FIS510L", 0, 0, 0, "FIS1510").
correquisito("FIS510L", 1, 0, 0, "FIS1511").
correquisito("FIS510L", 2, 0, 0, "FIZ010C").
correquisito("FIS510L", 3, 0, 0, "FIZ1111").
requisito("FIZ020", 0, 0, 0, "FIS109C").
requisito("FIZ020", 1, 0, 0, "FIS1512").
requisito("FIZ020", 2, 0, 0, "FIZ010").
requisito("FIZ020", 3, 0, 0, "FIZ010C").
requisito("FIZ020", 4, 0, 0, "FIZ1010").
requisito("FIZ1100", 0, 0, 0, "MAT1502").
correquisito("FIZ1100", 0, 1, 0, "MAT1512").
requisito("MED821", 0, 0, 0, "BIO135C").
correquisito("MED821", 1, 0, 0, "MEE200E").
correquisito("FIS1510", 0, 0, 0, "FIS510L").
requisito("FIS1510", 0, 1, 0, "MAT1409").
correquisito("FIS1510", 1, 0, 0, "FIS510L").
requisito("FIS1510", 1, 1, 0, "MAT1199").
correquisito("FIS1510", 2, 0, 0, "FIS510L").
requisito("FIS1510", 2, 1, 0, "MLM1100").
requisito("QIM114B", 0, 0, 0, "FIZ1111").
requisito("QIM114B", 0, 1, 0, "MLM1110").
requisito("QIM114B", 1, 0, 0, "FIZ020C").
requisito("QIM114B", 1, 1, 0, "MAT1516").
requisito("QIM114B", 2, 0, 0, "MAT1506").
requisito("MAT1135", 0, 0, 0, "MAT1125").
requisito("MAT1135", 1, 0, 0, "MLM1120").
requisito("EYP1113", 0, 0, 0, "MAT1523").
requisito("EYP1113", 1, 0, 0, "MAT1630").
requisito("MAT1523", 0, 0, 0, "MAT1512").
requisito("MLM1110", 0, 0, 0, "MAT1115").
requisito("MLM1110", 1, 0, 0, "MAT1409").
requisito("MLM1110", 2, 0, 0, "MAT1502").
requisito("MLM1110", 3, 0, 0, "MAT1503").
requisito("MLM1110", 4, 0, 0, "MAT2013").
requisito("MLM1110", 5, 0, 0, "MAT210E").
requisito("MLM1110", 6, 0, 0, "MLM1100").
requisito("MLM1110", 7, 0, 0, "MAT1004").
requisito("MLM1110", 8, 0, 0, "MAT110E").
requisito("MLM1110", 9, 0, 0, "MAT1000").
requisito("MLM1110", 10, 0, 0, "MAT1023").
requisito("QIM102A", 0, 0, 0, "QIM100").
requisito("QIM102A", 1, 0, 0, "QIM100F").
requisito("QIM102A", 2, 0, 0, "QIM100A").
requisito("QIM102A", 3, 0, 0, "QIM100B").
requisito("QIM102A", 4, 0, 0, "QIM109").
requisito("QIM102A", 5, 0, 0, "QIM100P").
requisito("MAT1316", 0, 0, 0, "MAT1102").
requisito("MAT1316", 1, 0, 0, "MAT1106").
requisito("MAT1316", 2, 0, 0, "MAT1206").
requisito("MAT1316", 3, 0, 0, "MAT1207").
requisito("MAT1316", 4, 0, 0, "MAT1204").
requisito("MAT1316", 5, 0, 0, "MAT1305").
requisito("MAT1316", 6, 0, 0, "MAT1306").
requisito("MAT1316", 7, 0, 0, "MAT2023").
requisito("MAT1316", 8, 0, 0, "MLM1300").
requisito("MAT1316", 9, 0, 0, "MAT1304").
requisito("MEE200E", 0, 0, 0, "BIO136C").
correquisito("MEE200E", 1, 0, 0, "MED821").
requisito("MAT1100", 0, 0, 0, "MAT1004").
requisito("MAT1100", 1, 0, 0, "MAT1012").
requisito("MAT1100", 2, 0, 0, "MAT1289").
requisito("MAT1100", 3, 0, 0, "MAT1492").
requisito("MAT1100", 4, 0, 0, "MAT1600").
requisito("MAT1100", 5, 0, 0, "MAT110E").
requisito("MAT1100", 6, 0, 0, "MAT1000").
requisito("MAT1100", 7, 0, 0, "MAT1070").
requisito("MAT1100", 8, 0, 0, "MAT117S").
requisito("MAT1100", 9, 0, 0, "MAT2013").
requisito("MAT1100", 10, 0, 0, "MAT117G").
requisito("MAT1100", 11, 0, 0, "MAT1409").
requisito("MAT1100", 12, 0, 0, "MAT1490").
requisito("MAT1100", 13, 0, 0, "MAT1491").
requisito("MAT1100", 14, 0, 0, "MAT1023").
correquisito("FIS0109", 0, 0, 0, "FIS109C").
correquisito("FIS0109", 1, 0, 0, "FIS119E").
correquisito("FIS0109", 2, 0, 0, "FIZ010").
correquisito("FIS0109", 3, 0, 0, "FIZ020").
correquisito("FIS0109", 4, 0, 0, "FIZ1111").
correquisito("BIO136C", 0, 0, 0, "QIM100").
requisito("QQF2501", 0, 0, 0, "FIZ020").
requisito("QQF2501", 0, 1, 0, "MAT1511").
requisito("QQF2501", 1, 0, 0, "FIZ020C").
requisito("QQF2501", 1, 1, 0, "MAT1516").
requisito("QQF2501", 2, 0, 0, "FIZ020").
requisito("QQF2501", 2, 1, 0, "MAT1511").
requisito("QQF2501", 3, 0, 0, "FIZ020C").
requisito("QQF2501", 3, 1, 0, "MAT1516").
requisito("ICH1104", 0, 0, 0, "FIS1523").
requisito("ICH1104", 0, 1, 0, "MAT1630").
requisito("ICH1104", 0, 2, 0, "MAT1640").
requisito("ICH1104", 1, 0, 0, "IIQ1003").
requisito("ICH1104", 1, 1, 0, "MAT1630").
requisito("ICH1104", 1, 2, 0, "MAT1640").
requisito("ICH1104", 2, 0, 0, "FIS1512").
requisito("ICH1104", 2, 1, 0, "ING1011").
requisito("ICH1104", 2, 2, 0, "MAT1523").
requisito("ICH1104", 2, 3, 0, "MAT1532").
requisito("ICH1104", 3, 0, 0, "FIS1512").
requisito("ICH1104", 3, 1, 0, "IPP1000").
requisito("ICH1104", 3, 2, 0, "MAT1523").
requisito("ICH1104", 3, 3, 0, "MAT1532").
requisito("ICH1104", 4, 0, 0, "ICE1013").
requisito("ICH1104", 4, 1, 0, "ING1011").
requisito("ICH1104", 4, 2, 0, "MAT1523").
requisito("ICH1104", 4, 3, 0, "MAT1532").
requisito("ICH1104", 5, 0, 0, "ICE1013").
requisito("ICH1104", 5, 1, 0, "IPP1000").
requisito("ICH1104", 5, 2, 0, "MAT1523").
requisito("ICH1104", 5, 3, 0, "MAT1532").
requisito("ICH1104", 6, 0, 0, "FIZ0211").
requisito("ICH1104", 6, 1, 0, "MAT1630").
requisito("ICH1104", 6, 2, 0, "MAT1640").
requisito("ICH1104", 7, 0, 0, "ICM1003").
requisito("ICH1104", 7, 1, 0, "MAT1630").
requisito("ICH1104", 7, 2, 0, "MAT1640").
requisito("ICH1104", 8, 0, 0, "IIQ103H").
requisito("ICH1104", 8, 1, 0, "MAT1630").
requisito("ICH1104", 8, 2, 0, "MAT1640").
requisito("FIZ1300", 0, 0, 0, "FIZ1250").
requisito("FIZ1300", 0, 1, 0, "MAT1522").
correquisito("FIZ0123", 0, 0, 0, "MAT1620").
correquisito("FIZ0123", 1, 0, 0, "MAT1126").
correquisito("FIZ0123", 2, 0, 0, "MAT1124").
correquisito("FIZ0123", 3, 0, 0, "MAT1512").
correquisito("FIZ0123", 4, 0, 0, "MAT1125").
requisito("BIO151E", 0, 0, 0, "BIO100").
requisito("BIO151E", 1, 0, 0, "BIO100B").
requisito("BIO151E", 2, 0, 0, "BIO141").
requisito("BIO151E", 3, 0, 0, "BIO141C").
correquisito("FIZ020L", 0, 0, 0, "FIZ020C").
correquisito("FIZ020L", 1, 0, 0, "FIZ020").
requisito("MAT1640", 0, 0, 0, "MAT1203").
requisito("MAT1640", 0, 1, 0, "MAT1620").
requisito("MAT1640", 1, 0, 0, "MAT1126").
requisito("MAT1640", 1, 1, 0, "MAT1203").
requisito("MAT1640", 2, 0, 0, "MAT1216").
requisito("MAT1640", 2, 1, 0, "MAT1620").
requisito("MAT1640", 3, 0, 0, "MAT1126").
requisito("MAT1640", 3, 1, 0, "MAT1216").
requisito("IIQ2133", 0, 0, 0, "FIS1523").
requisito("IIQ2133", 0, 1, 0, "QIM100A").
requisito("IIQ2133", 1, 0, 0, "IIQ1003").
requisito("IIQ2133", 1, 1, 0, "QIM100A").
requisito("IIQ2133", 2, 0, 0, "ICM1003").
requisito("IIQ2133", 2, 1, 0, "QIM100A").
requisito("IIQ2133", 3, 0, 0, "IIQ1002").
requisito("IIQ2133", 3, 1, 0, "ING1011").
requisito("IIQ2133", 4, 0, 0, "IIQ1002").
requisito("IIQ2133", 4, 1, 0, "IPP1000").
requisito("IIQ2133", 5, 0, 0, "FIZ0211").
requisito("IIQ2133", 5, 1, 0, "QIM100A").
requisito("IIQ2133", 6, 0, 0, "FIS1523").
requisito("IIQ2133", 6, 1, 0, "QIM100E").
requisito("IIQ2133", 7, 0, 0, "IIQ1003").
requisito("IIQ2133", 7, 1, 0, "QIM100E").
requisito("IIQ2133", 8, 0, 0, "IIQ103H").
requisito("IIQ2133", 8, 1, 0, "QIM100E").
requisito("IIQ2133", 9, 0, 0, "ICM1003").
requisito("IIQ2133", 9, 1, 0, "QIM100E").
requisito("IIQ2133", 10, 0, 0, "FIZ0211").
requisito("IIQ2133", 10, 1, 0, "QIM100E").
requisito("IIQ2133", 11, 0, 0, "IIQ103H").
requisito("IIQ2133", 11, 1, 0, "QIM100A").
requisito("IIQ2133", 12, 0, 0, "FIS1522").
requisito("IIQ2133", 12, 1, 0, "IIQ1002").
requisito("IIQ2133", 12, 2, 0, "ING1011").
requisito("IIQ2133", 13, 0, 0, "FIS1522").
requisito("IIQ2133", 13, 1, 0, "IIQ1002").
requisito("IIQ2133", 13, 2, 0, "IPP1000").
requisito("IIQ2133", 14, 0, 0, "QIM115").
correquisito("FIZ0121", 0, 0, 0, "FIZ121L").
requisito("FIZ0121", 0, 1, 0, "MAT1610").
correquisito("FIZ0121", 0, 2, 0, "MAT1620").
correquisito("FIZ0121", 1, 0, 0, "FIZ121L").
requisito("FIZ0121", 1, 1, 0, "MAT1115").
correquisito("FIZ0121", 2, 0, 0, "FIZ121L").
correquisito("FIZ0121", 2, 1, 0, "MLM1110").
correquisito("FIZ0121", 3, 0, 0, "FIZ121L").
correquisito("FIZ0121", 3, 1, 0, "MAT220E").
correquisito("FIZ0121", 4, 0, 0, "FIZ121L").
correquisito("FIZ0121", 4, 1, 0, "MAT1620").
correquisito("FIZ0121", 5, 0, 0, "FIZ121L").
correquisito("FIZ0121", 5, 1, 0, "MAT1126").
requisito("MAT1126", 0, 0, 0, "MAT1115").
requisito("MAT1126", 1, 0, 0, "MAT1116").
requisito("MAT1126", 2, 0, 0, "MAT1114").
requisito("MAT1126", 3, 0, 0, "MAT1125").
requisito("MAT1126", 4, 0, 0, "MAT1610").
requisito("MAT1315", 0, 0, 0, "MAT1102").
requisito("MAT1315", 1, 0, 0, "MAT1106").
requisito("MAT1315", 2, 0, 0, "MAT1305").
requisito("MAT1315", 3, 0, 0, "MAT1306").
requisito("MAT1315", 4, 0, 0, "MAT2023").
requisito("MAT1315", 5, 0, 0, "MLM1300").
requisito("MAT1315", 6, 0, 0, "MAT1206").
requisito("MAT1315", 7, 0, 0, "MAT1207").
requisito("MAT1315", 8, 0, 0, "MAT1204").
requisito("MAT1315", 9, 0, 0, "MAT1304").
requisito("MAT220E", 0, 0, 0, "MAT210E").
requisito("MAT220E", 1, 0, 0, "MAT1610").
requisito("ICH2314", 0, 0, 0, "ICH2304").
requisito("ICH2314", 1, 0, 0, "ICH1303").
requisito("ICH2314", 1, 1, 0, "IPP1000").
requisito("ICH2314", 1, 2, 0, "QIM100").
requisito("ICH2314", 2, 0, 0, "ICH1303").
requisito("ICH2314", 2, 1, 0, "ING1011").
requisito("ICH2314", 2, 2, 0, "QIM100").

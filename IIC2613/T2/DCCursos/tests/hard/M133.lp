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
major_necesario("IIC1253", 0).
major_necesario("IIC2233", 1).
major_necesario("IIC2133", 2).
major_necesario("IIC2143", 3).
major_necesario("IIC2413", 4).
major_necesario("IIC2513", 5).
major_necesario("IIC2154", 6).
major_necesario("IIC2343", 7).
major_necesario("IIC2333", 8).
major_necesario("IIC2613", 9).

% Cursos en dependencias
curso("ICS2121", 0).
curso("MAT1610", 0).
curso("MAT1203", 0).
curso("FIS1513", 0).
curso("AST0111", 0).
curso("MED103A", 0).
curso("FIS1522", 0).
curso("IMT2240", 0).
curso("IIC2233", 0).
curso("MLM1120", 0).
curso("MLM1130", 0).
curso("FIZ010C", 0).
curso("IEE1533", 2).
curso("FIS0152", 0).
curso("IIC2343", 0).
curso("MAT1000", 0).
curso("ICE1003", 0).
curso("IIC1001", 0).
curso("EYP2114", 0).
curso("MAT1522", 0).
curso("FIS109C", 0).
curso("MAT1199", 0).
curso("MAT1116", 0).
curso("MAT1109", 0).
curso("IIC1253", 0).
curso("FIZ0211", 0).
curso("BIO135C", 0).
curso("MAT1004", 0).
curso("MAT1304", 0).
curso("MAT1206", 0).
curso("MED209A", 0).
curso("EYP2113", 0).
curso("AST0212", 0).
curso("ING1003", 0).
curso("ICS1102", 0).
curso("BIO141C", 0).
curso("FIZ010L", 0).
curso("FIZ1250", 0).
curso("MAT1492", 0).
curso("ICE1514", 0).
curso("IPP1000", 0).
curso("ICM1022", 0).
curso("FIS1512", 0).
curso("MAT1136", 0).
curso("IEE2103", 0).
curso("IRB1001", 0).
curso("ING1011", 0).
curso("MAT230E", 0).
curso("IDI2015", 0).
curso("MAT1124", 0).
curso("FIZ121", 0).
curso("IMT2230", 0).
curso("IIC1222", 0).
curso("ICS113H", 1).
curso("MAT1306", 0).
curso("FIZ0221", 0).
curso("IIC2733", 0).
curso("MAT1115", 0).
curso("IMT2210", 0).
curso("MAT1204", 0).
curso("IIC2413", 0).
curso("MAT1104", 0).
curso("MED110A", 0).
curso("FIZ121A", 0).
curso("FIS1503", 0).
curso("EDU024M", 0).
curso("ING2004", 0).
curso("MAT1202", 0).
curso("FIZ221L", 0).
curso("FIS1523", 0).
curso("IRB2002", 2).
curso("MAT1215", 0).
curso("FIZ1111", 0).
curso("ICS1513", 0).
curso("IIQ1003", 0).
curso("IIC2142", 0).
curso("ICM2403", 0).
curso("EYP1025", 0).
curso("FIZ010", 0).
curso("MAT1216", 0).
curso("IIC1141", 0).
curso("MAT1114", 0).
curso("ING1004", 0).
curso("IMT2220", 0).
curso("MAT1214", 0).
curso("IIC1122", 0).
curso("FIS1514", 0).
curso("MAT1630", 0).
curso("FIS0153", 0).
curso("ICS2562", 0).
curso("ING2015", 0).
curso("MEB103F", 0).
curso("MAT1512", 0).
curso("MAT1600", 0).
curso("MAT1503", 0).
curso("MAT110E", 0).
curso("MAT1409", 0).
curso("IIC2154", 0).
curso("MEB103E", 0).
curso("MAT1620", 0).
curso("MAT1125", 0).
curso("ICS2613", 0).
curso("BIO152C", 0).
curso("IDI1015", 0).
curso("EYP1015", 0).
curso("FIS0154", 0).
curso("IBM2122", 1).
curso("FIZ121L", 0).
curso("MAT0006", 0).
curso("IIC1102", 0).
curso("ICS1113", 0).
curso("MAT1207", 0).
curso("IDI2025", 0).
curso("MLM1310", 0).
curso("MAT1502", 0).
curso("BIO143M", 2).
curso("MAT2023", 0).
curso("FIS1511", 0).
curso("MAT2013", 0).
curso("MAT1012", 0).
curso("IIC2173", 0).
curso("QIM100A", 0).
curso("IMT2200", 0).
curso("MAT1102", 0).
curso("ICM1003", 0).
curso("IIC2713", 0).
curso("ICE1013", 0).
curso("MAT1103", 0).
curso("IIC3103", 0).
curso("IIQ103H", 0).
curso("FIS1533", 0).
curso("MAT1408", 0).
curso("IIC2613", 0).
curso("MAT2012", 0).
curso("LET0003", 0).
curso("ICE1513", 0).
curso("IIC1103", 0).
curso("FIS154D", 0).
curso("MAT1107", 0).
curso("FIS1532", 0).
curso("MAT1106", 0).
curso("MAT1305", 0).
curso("IIC2143", 0).
curso("ELM1100", 0).
curso("IIC2133", 0).
curso("MED107A", 0).
curso("FIZ1010", 0).
curso("MAT1532", 0).
curso("FIS510L", 0).
curso("IIC2412", 0).
curso("IIC2513", 0).
curso("FIZ020", 0).
curso("FIZ1100", 0).
curso("FIL188", 0).
curso("MED821", 0).
curso("MAT210E", 0).
curso("ICS2123", 0).
curso("ELM1111", 0).
curso("MAT1135", 0).
curso("FIS1510", 0).
curso("EYP1113", 0).
curso("IBM2123", 2).
curso("MAT1523", 0).
curso("MLM1300", 0).
curso("FIS119E", 0).
curso("MLM1110", 0).
curso("MLM1100", 0).
curso("QIM100E", 0).
curso("ING1015", 0).
curso("BIO110C", 0).
curso("MAT1316", 0).
curso("ICS2122", 0).
curso("MEE200E", 0).
curso("EYP1112", 0).
curso("EDU024F", 0).
curso("IRB2001", 2).
curso("FIS0109", 0).
curso("BIO136C", 0).
curso("IDI2004", 0).
curso("FIZ1300", 0).
curso("FIZ0123", 0).
curso("IIC2252", 0).
curso("ING1024", 0).
curso("MAT1023", 0).
curso("FIZ221A", 0).
curso("MAT1289", 0).
curso("MAT1640", 0).
curso("QIM101Q", 0).
curso("QIM100", 0).
curso("ING2030", 0).
curso("ICS2813", 0).
curso("FIZ0121", 0).
curso("IIC2333", 0).
curso("MAT1126", 0).
curso("QIM100I", 0).
curso("MAT1315", 0).
curso("MAT220E", 0).

% Cursos y requisitos
requisito("ICS2121", 0, 0, 0, "ICS1113").
requisito("ICS2121", 0, 1, 0, "MAT1630").
requisito("ICS2121", 1, 0, 0, "ICS113H").
requisito("ICS2121", 1, 1, 0, "MAT1630").
requisito("FIS1513", 0, 0, 0, "FIS1503").
requisito("FIS1513", 0, 1, 0, "MAT1203").
correquisito("FIS1513", 0, 2, 0, "MAT1620").
correquisito("FIS1513", 1, 0, 0, "MAT1203").
requisito("FIS1513", 1, 1, 0, "MAT1610").
requisito("FIS1522", 0, 0, 0, "FIS1512").
requisito("FIS1522", 0, 1, 0, "MAT1512").
requisito("FIS1522", 1, 0, 0, "ICE1013").
requisito("FIS1522", 1, 1, 0, "MAT1512").
requisito("IMT2240", 0, 0, 0, "IMT2200").
requisito("IMT2240", 0, 1, 0, "IIC1222").
requisito("IMT2240", 0, 1, 1, "IIC2233").
requisito("IIC2233", 0, 0, 0, "IIC1103").
requisito("IIC2233", 1, 0, 0, "IIC1102").
requisito("MLM1120", 0, 0, 0, "MLM1110").
correquisito("FIZ010C", 0, 0, 0, "FIZ010L").
correquisito("IEE1533", 0, 0, 0, "FIS0153").
requisito("IEE1533", 0, 1, 0, "MAT1630").
requisito("IEE1533", 0, 1, 1, "MAT1523").
requisito("IEE1533", 0, 1, 2, "MAT230E").
requisito("IEE1533", 0, 1, 3, "MLM1130").
correquisito("FIS0152", 0, 0, 0, "FIS1523").
correquisito("FIS0152", 0, 0, 1, "IIQ1003").
correquisito("FIS0152", 0, 0, 2, "ICM1003").
correquisito("FIS0152", 0, 0, 3, "IIQ103H").
correquisito("IIC2343", 0, 0, 0, "IIC2233").
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
requisito("IIC1253", 0, 0, 0, "MAT1203").
requisito("IIC1253", 1, 0, 0, "IIC1102").
requisito("IIC1253", 1, 1, 0, "ING1011").
requisito("IIC1253", 1, 2, 0, "MAT1202").
requisito("IIC1253", 2, 0, 0, "IIC1102").
requisito("IIC1253", 2, 1, 0, "IPP1000").
requisito("IIC1253", 2, 2, 0, "MAT1202").
requisito("IIC1253", 3, 0, 0, "IMT2210").
requisito("IIC1253", 4, 0, 0, "IIC1001").
requisito("IIC1253", 4, 1, 0, "MAT1207").
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
requisito("MED209A", 0, 0, 0, "MED110A").
requisito("EYP2113", 0, 0, 0, "ELM1111").
requisito("EYP2113", 1, 0, 0, "EYP1112").
requisito("EYP2113", 2, 0, 0, "EYP1113").
requisito("AST0212", 0, 0, 0, "AST0111").
requisito("AST0212", 0, 1, 0, "IIC1103").
requisito("AST0212", 0, 2, 0, "MAT1610").
requisito("AST0212", 1, 0, 0, "IIC1103").
requisito("AST0212", 1, 1, 0, "IMT2200").
requisito("AST0212", 2, 0, 0, "IIC1001").
requisito("AST0212", 2, 1, 0, "IIC1103").
requisito("AST0212", 2, 2, 0, "MAT1610").
requisito("ICS1102", 0, 0, 0, "MAT1202").
requisito("ICS1102", 0, 1, 0, "MAT1523").
requisito("ICS1102", 1, 0, 0, "MAT1135").
requisito("ICS1102", 1, 1, 0, "MAT1215").
requisito("ICS1102", 2, 0, 0, "MAT1135").
requisito("ICS1102", 2, 1, 0, "MAT1215").
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
correquisito("IEE2103", 0, 0, 0, "MAT1640").
requisito("IEE2103", 1, 0, 0, "MAT1532").
requisito("MAT230E", 0, 0, 0, "MAT220E").
requisito("IDI2015", 0, 0, 0, "ING1003").
requisito("IDI2015", 0, 1, 0, "ING1015").
requisito("IDI2015", 1, 0, 0, "ING1004").
requisito("IDI2015", 1, 1, 0, "ING1015").
requisito("IDI2015", 2, 0, 0, "ING1003").
requisito("IDI2015", 2, 1, 0, "IDI1015").
requisito("IDI2015", 3, 0, 0, "ING1004").
requisito("IDI2015", 3, 1, 0, "IDI1015").
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
requisito("IIC1222", 0, 0, 0, "IIC1102").
requisito("IIC1222", 1, 0, 0, "IIC1103").
requisito("ICS113H", 0, 0, 0, "MAT1203").
requisito("ICS113H", 0, 1, 0, "MAT1620").
requisito("ICS113H", 0, 1, 1, "MAT1214").
requisito("ICS113H", 0, 2, 0, "MAT1620").
requisito("ICS113H", 0, 2, 1, "IMT2220").
requisito("ICS113H", 0, 3, 0, "IMT2230").
requisito("ICS113H", 0, 4, 0, "IIC1103").
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
requisito("IIC2733", 0, 0, 0, "IIC2713").
requisito("IIC2733", 1, 0, 0, "IIC2142").
requisito("IIC2733", 2, 0, 0, "IIC2412").
requisito("IIC2733", 3, 0, 0, "IIC2413").
requisito("IIC2733", 3, 1, 0, "IMT2240").
requisito("IIC2733", 4, 0, 0, "ICS2122").
requisito("IIC2733", 5, 0, 0, "IRB2002").
requisito("IIC2733", 6, 0, 0, "IDI2025").
requisito("IIC2733", 7, 0, 0, "IBM2123").
requisito("IMT2210", 0, 0, 0, "IIC1103").
requisito("IMT2210", 0, 1, 0, "MAT1107").
requisito("IMT2210", 0, 1, 1, "MAT1106").
requisito("IMT2210", 0, 2, 0, "MAT1207").
requisito("IMT2210", 0, 2, 1, "MAT1206").
requisito("IMT2210", 0, 2, 2, "MAT1306").
requisito("IIC2413", 0, 0, 0, "IIC2233").
requisito("IIC2413", 1, 0, 0, "IIC1222").
requisito("IIC2413", 1, 1, 0, "IIC2252").
requisito("IIC2413", 2, 0, 0, "ICS2122").
requisito("IIC2413", 3, 0, 0, "IRB2002").
requisito("IIC2413", 4, 0, 0, "IDI2025").
requisito("IIC2413", 5, 0, 0, "IBM2123").
requisito("MED110A", 0, 0, 0, "MED103A").
requisito("MED110A", 1, 0, 0, "MED107A").
requisito("ING2004", 0, 0, 0, "ING1003").
requisito("ING2004", 1, 0, 0, "ING1004").
requisito("MAT1202", 0, 0, 0, "MAT1102").
requisito("MAT1202", 1, 0, 0, "MAT1305").
requisito("MAT1202", 2, 0, 0, "MLM1300").
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
requisito("IRB2002", 0, 0, 0, "IRB2001").
requisito("IRB2002", 1, 0, 0, "IRB1001").
requisito("MAT1215", 0, 0, 0, "MAT1206").
requisito("MAT1215", 1, 0, 0, "MAT1207").
requisito("MAT1215", 2, 0, 0, "MAT1204").
requisito("MAT1215", 3, 0, 0, "MAT1216").
requisito("MAT1215", 4, 0, 0, "MAT1214").
requisito("MAT1215", 5, 0, 0, "MAT1315").
requisito("MAT1215", 6, 0, 0, "MAT1316").
requisito("MAT1215", 7, 0, 0, "MLM1310").
requisito("MAT1215", 8, 0, 0, "MAT1203").
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
requisito("IIC2142", 0, 0, 0, "IIC1122").
requisito("IIC2142", 1, 0, 0, "IIC1141").
requisito("IIC2142", 2, 0, 0, "IIC1222").
requisito("IIC2142", 3, 0, 0, "IIC2233").
requisito("ICM2403", 0, 0, 0, "FIS1513").
requisito("ICM2403", 0, 1, 0, "QIM100A").
requisito("ICM2403", 1, 0, 0, "ICE1513").
requisito("ICM2403", 1, 1, 0, "QIM100A").
requisito("ICM2403", 2, 0, 0, "FIS1514").
requisito("ICM2403", 2, 1, 0, "QIM100E").
requisito("ICM2403", 3, 0, 0, "ICE1514").
requisito("ICM2403", 3, 1, 0, "QIM100E").
requisito("EYP1025", 0, 0, 0, "EYP1015").
requisito("EYP1025", 0, 1, 0, "MAT1135").
requisito("EYP1025", 1, 0, 0, "EYP1015").
requisito("EYP1025", 1, 1, 0, "MAT1630").
requisito("EYP1025", 2, 0, 0, "IMT2220").
requisito("EYP1025", 2, 1, 0, "IMT2230").
requisito("MAT1216", 0, 0, 0, "MAT1305").
requisito("MAT1216", 1, 0, 0, "MAT1306").
requisito("MAT1216", 2, 0, 0, "MAT1304").
requisito("MAT1114", 0, 0, 0, "MAT1104").
requisito("MAT1114", 1, 0, 0, "MAT1106").
requisito("IMT2220", 0, 0, 0, "MAT1610").
requisito("IMT2220", 0, 0, 1, "MAT1116").
requisito("IMT2220", 0, 0, 2, "MAT1114").
correquisito("IMT2220", 0, 1, 0, "IMT2210").
requisito("MAT1214", 0, 0, 0, "MAT1204").
requisito("MAT1214", 0, 0, 1, "MAT1206").
requisito("MAT1214", 0, 0, 2, "MAT1207").
requisito("MAT1214", 0, 1, 0, "MAT1304").
requisito("MAT1214", 0, 1, 1, "MAT1306").
correquisito("FIS1514", 0, 0, 0, "FIS0154").
correquisito("FIS1514", 0, 1, 0, "MAT1203").
requisito("FIS1514", 0, 2, 0, "MAT1610").
requisito("MAT1630", 0, 0, 0, "MAT1203").
requisito("MAT1630", 0, 1, 0, "MAT1620").
correquisito("FIS0153", 0, 0, 0, "FIS1533").
correquisito("FIS0153", 1, 0, 0, "FIS1532").
correquisito("FIS0153", 2, 0, 0, "FIZ0221").
correquisito("FIS0153", 3, 0, 0, "IEE1533").
requisito("ICS2562", 0, 0, 0, "EYP1112").
requisito("ICS2562", 1, 0, 0, "EYP1113").
requisito("ICS2562", 2, 0, 0, "EYP2113").
requisito("ING2015", 0, 0, 0, "ING1003").
requisito("ING2015", 1, 0, 0, "ING1004").
requisito("MAT1512", 0, 0, 0, "MAT1503").
requisito("IIC2154", 0, 0, 0, "IIC2143").
requisito("IIC2154", 0, 1, 0, "IIC2513").
requisito("IIC2154", 0, 2, 0, "IIC2613").
requisito("IIC2154", 1, 0, 0, "IIC2143").
requisito("IIC2154", 1, 1, 0, "IIC2173").
requisito("IIC2154", 1, 2, 0, "IIC2513").
requisito("IIC2154", 2, 0, 0, "IIC2143").
requisito("IIC2154", 2, 1, 0, "IIC2513").
requisito("IIC2154", 2, 2, 0, "IIC2733").
requisito("IIC2154", 3, 0, 0, "IIC2143").
requisito("IIC2154", 3, 1, 0, "IIC2333").
requisito("IIC2154", 3, 2, 0, "IIC2413").
requisito("IIC2154", 3, 3, 0, "IIC2733").
requisito("IIC2154", 3, 4, 0, "IIC3103").
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
requisito("IDI1015", 0, 0, 0, "ING1003").
requisito("IDI1015", 1, 0, 0, "ING1004").
requisito("EYP1015", 0, 0, 0, "MAT1620").
requisito("EYP1015", 1, 0, 0, "MAT1125").
correquisito("FIS0154", 0, 0, 0, "FIS1514").
correquisito("FIS0154", 1, 0, 0, "ICE1514").
correquisito("FIS0154", 2, 0, 0, "FIS1513").
correquisito("FIS0154", 3, 0, 0, "ICE1513").
correquisito("FIS0154", 4, 0, 0, "ICE1003").
correquisito("FIS0154", 5, 0, 0, "ICM1022").
correquisito("FIS0154", 6, 0, 0, "FIS154D").
requisito("IBM2122", 0, 0, 0, "MED110A").
requisito("IBM2122", 1, 0, 0, "IEE2103").
requisito("IBM2122", 1, 1, 0, "ING1024").
requisito("IBM2122", 2, 0, 0, "ICM2403").
requisito("IBM2122", 2, 1, 0, "IEE2103").
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
requisito("IDI2025", 0, 0, 0, "ING2004").
requisito("IDI2025", 0, 1, 0, "ING2015").
requisito("IDI2025", 1, 0, 0, "ING2004").
requisito("IDI2025", 1, 1, 0, "IDI2015").
requisito("IDI2025", 2, 0, 0, "ING2015").
requisito("IDI2025", 2, 1, 0, "IDI2004").
requisito("IDI2025", 3, 0, 0, "IDI2004").
requisito("IDI2025", 3, 1, 0, "IDI2015").
requisito("MLM1310", 0, 0, 0, "MAT1102").
requisito("MLM1310", 1, 0, 0, "MAT1109").
requisito("MLM1310", 2, 0, 0, "MAT1305").
requisito("MLM1310", 3, 0, 0, "MAT2012").
requisito("MLM1310", 4, 0, 0, "MLM1300").
requisito("BIO143M", 0, 0, 0, "MAT1000").
requisito("BIO143M", 1, 0, 0, "MAT1610").
requisito("FIS1511", 0, 0, 0, "MAT1408").
requisito("FIS1511", 1, 0, 0, "MAT1409").
requisito("FIS1511", 2, 0, 0, "MAT110E").
requisito("FIS1511", 3, 0, 0, "MAT1000").
requisito("FIS1511", 4, 0, 0, "MAT1023").
requisito("IIC2173", 0, 0, 0, "IIC2142").
requisito("IIC2173", 1, 0, 0, "IIC2143").
requisito("QIM100A", 0, 0, 0, "QIM100I").
requisito("QIM100A", 0, 1, 0, "QIM101Q").
requisito("IMT2200", 0, 0, 0, "IIC1102").
requisito("IMT2200", 0, 0, 1, "IIC1103").
requisito("IMT2200", 0, 1, 0, "MAT1207").
requisito("IMT2200", 0, 1, 1, "MAT1206").
requisito("IMT2200", 0, 1, 2, "MAT1306").
correquisito("ICM1003", 0, 0, 0, "FIS0152").
correquisito("ICM1003", 0, 1, 0, "MAT1523").
correquisito("ICM1003", 0, 1, 1, "MAT1630").
correquisito("ICM1003", 0, 1, 2, "MAT230E").
correquisito("ICM1003", 0, 1, 3, "MLM1130").
requisito("ICM1003", 1, 0, 0, "IMT2220").
requisito("ICM1003", 1, 1, 0, "IMT2230").
requisito("IIC2713", 0, 0, 0, "IIC1103").
requisito("IIC2713", 1, 0, 0, "IIC1222").
requisito("IIC2713", 1, 1, 0, "ING1011").
requisito("IIC2713", 2, 0, 0, "IIC1222").
requisito("IIC2713", 2, 1, 0, "IPP1000").
requisito("ICE1013", 0, 0, 0, "MAT1102").
requisito("ICE1013", 0, 1, 0, "MAT1503").
requisito("IIC3103", 0, 0, 0, "IIC2143").
requisito("IIC3103", 0, 1, 0, "IIC2413").
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
requisito("IIC2613", 0, 0, 0, "EYP1113").
requisito("IIC2613", 0, 1, 0, "IIC2233").
requisito("IIC2613", 1, 0, 0, "EYP1025").
requisito("IIC2613", 1, 1, 0, "IIC2233").
requisito("IIC2613", 2, 0, 0, "AST0212").
requisito("IIC2613", 2, 1, 0, "IIC2233").
requisito("IIC2613", 3, 0, 0, "ICS2122").
requisito("IIC2613", 4, 0, 0, "IRB2002").
requisito("IIC2613", 5, 0, 0, "IDI2025").
requisito("IIC2613", 6, 0, 0, "IBM2123").
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
requisito("IIC2143", 0, 0, 0, "IIC2233").
requisito("IIC2143", 1, 0, 0, "IIC1222").
requisito("IIC2143", 2, 0, 0, "ICS2122").
requisito("IIC2143", 3, 0, 0, "IRB2002").
requisito("IIC2143", 4, 0, 0, "IDI2025").
requisito("IIC2143", 5, 0, 0, "IBM2123").
requisito("ELM1100", 0, 0, 0, "MLM1110").
requisito("IIC2133", 0, 0, 0, "IIC1253").
requisito("IIC2133", 0, 1, 0, "IIC2233").
requisito("IIC2133", 1, 0, 0, "ICS2122").
requisito("IIC2133", 2, 0, 0, "IRB2002").
requisito("IIC2133", 3, 0, 0, "IDI2025").
requisito("IIC2133", 4, 0, 0, "IBM2123").
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
requisito("IIC2412", 0, 0, 0, "IIC1222").
requisito("IIC2412", 0, 1, 0, "IIC2252").
requisito("IIC2513", 0, 0, 0, "IIC2413").
requisito("IIC2513", 1, 0, 0, "ICS2122").
requisito("IIC2513", 2, 0, 0, "IRB2002").
requisito("IIC2513", 3, 0, 0, "IDI2025").
requisito("IIC2513", 4, 0, 0, "IBM2123").
requisito("FIZ020", 0, 0, 0, "FIS109C").
requisito("FIZ020", 1, 0, 0, "FIS1512").
requisito("FIZ020", 2, 0, 0, "FIZ010").
requisito("FIZ020", 3, 0, 0, "FIZ010C").
requisito("FIZ020", 4, 0, 0, "FIZ1010").
requisito("FIZ1100", 0, 0, 0, "MAT1502").
correquisito("FIZ1100", 0, 1, 0, "MAT1512").
requisito("MED821", 0, 0, 0, "BIO135C").
correquisito("MED821", 1, 0, 0, "MEE200E").
requisito("ICS2123", 0, 0, 0, "EYP1113").
requisito("ICS2123", 0, 1, 0, "ICS1113").
requisito("ICS2123", 1, 0, 0, "EYP1025").
requisito("ICS2123", 1, 1, 0, "ICS1102").
requisito("ELM1111", 0, 0, 0, "ELM1100").
requisito("ELM1111", 0, 1, 0, "MLM1120").
requisito("MAT1135", 0, 0, 0, "MAT1125").
requisito("MAT1135", 1, 0, 0, "MLM1120").
correquisito("FIS1510", 0, 0, 0, "FIS510L").
requisito("FIS1510", 0, 1, 0, "MAT1409").
correquisito("FIS1510", 1, 0, 0, "FIS510L").
requisito("FIS1510", 1, 1, 0, "MAT1199").
correquisito("FIS1510", 2, 0, 0, "FIS510L").
requisito("FIS1510", 2, 1, 0, "MLM1100").
requisito("EYP1113", 0, 0, 0, "MAT1523").
requisito("EYP1113", 1, 0, 0, "MAT1630").
requisito("IBM2123", 0, 0, 0, "IBM2122").
requisito("IBM2123", 1, 0, 0, "MED209A").
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
requisito("ING1015", 0, 0, 0, "ING1003").
requisito("ING1015", 1, 0, 0, "ING1004").
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
requisito("ICS2122", 0, 0, 0, "ICS2121").
requisito("ICS2122", 0, 1, 0, "ICS2123").
requisito("ICS2122", 0, 2, 0, "ICS2562").
correquisito("ICS2122", 0, 3, 0, "ICS2613").
correquisito("ICS2122", 0, 4, 0, "ICS2813").
requisito("ICS2122", 1, 0, 0, "EYP2114").
requisito("ICS2122", 1, 1, 0, "ICS2121").
requisito("ICS2122", 1, 2, 0, "ICS2123").
correquisito("ICS2122", 1, 3, 0, "ICS2613").
correquisito("ICS2122", 1, 4, 0, "ICS2813").
requisito("MEE200E", 0, 0, 0, "BIO136C").
correquisito("MEE200E", 1, 0, 0, "MED821").
requisito("EYP1112", 0, 0, 0, "MAT1523").
requisito("IRB2001", 0, 0, 0, "FIS1513").
requisito("IRB2001", 1, 0, 0, "ICE1513").
requisito("IRB2001", 2, 0, 0, "FIS1514").
requisito("IRB2001", 3, 0, 0, "ICE1514").
correquisito("FIS0109", 0, 0, 0, "FIS109C").
correquisito("FIS0109", 1, 0, 0, "FIS119E").
correquisito("FIS0109", 2, 0, 0, "FIZ010").
correquisito("FIS0109", 3, 0, 0, "FIZ020").
correquisito("FIS0109", 4, 0, 0, "FIZ1111").
correquisito("BIO136C", 0, 0, 0, "QIM100").
requisito("IDI2004", 0, 0, 0, "ING1003").
requisito("IDI2004", 0, 1, 0, "ING2015").
requisito("IDI2004", 1, 0, 0, "ING1004").
requisito("IDI2004", 1, 1, 0, "ING2015").
requisito("IDI2004", 2, 0, 0, "ING1003").
requisito("IDI2004", 2, 1, 0, "IDI2015").
requisito("IDI2004", 3, 0, 0, "ING1004").
requisito("IDI2004", 3, 1, 0, "IDI2015").
requisito("FIZ1300", 0, 0, 0, "FIZ1250").
requisito("FIZ1300", 0, 1, 0, "MAT1522").
correquisito("FIZ0123", 0, 0, 0, "MAT1620").
correquisito("FIZ0123", 1, 0, 0, "MAT1126").
correquisito("FIZ0123", 2, 0, 0, "MAT1124").
correquisito("FIZ0123", 3, 0, 0, "MAT1512").
correquisito("FIZ0123", 4, 0, 0, "MAT1125").
requisito("IIC2252", 0, 0, 0, "IIC1102").
requisito("IIC2252", 0, 1, 0, "MAT1202").
requisito("ING1024", 0, 0, 0, "FIS1513").
requisito("ING1024", 0, 1, 0, "QIM100A").
requisito("ING1024", 1, 0, 0, "FIS1514").
requisito("ING1024", 1, 1, 0, "QIM100A").
requisito("ING1024", 2, 0, 0, "FIS1514").
requisito("ING1024", 2, 1, 0, "QIM100E").
requisito("ING1024", 3, 0, 0, "ICE1513").
requisito("ING1024", 3, 1, 0, "QIM100A").
requisito("ING1024", 4, 0, 0, "ICE1514").
requisito("ING1024", 4, 1, 0, "QIM100A").
requisito("ING1024", 5, 0, 0, "ICE1514").
requisito("ING1024", 5, 1, 0, "QIM100E").
requisito("ING1024", 6, 0, 0, "FIS1512").
requisito("ING1024", 6, 1, 0, "ICE1013").
requisito("ING1024", 6, 2, 0, "ING1011").
requisito("ING1024", 6, 3, 0, "QIM100").
requisito("ING1024", 7, 0, 0, "FIS1512").
requisito("ING1024", 7, 1, 0, "ICE1013").
requisito("ING1024", 7, 2, 0, "IPP1000").
requisito("ING1024", 7, 3, 0, "QIM100").
requisito("ING1024", 8, 0, 0, "FIZ0121").
requisito("ING1024", 8, 1, 0, "FIZ0211").
requisito("ING1024", 8, 2, 0, "QIM100A").
requisito("ING1024", 9, 0, 0, "FIS1513").
requisito("ING1024", 9, 1, 0, "QIM100E").
requisito("ING1024", 10, 0, 0, "ICE1513").
requisito("ING1024", 10, 1, 0, "QIM100E").
requisito("ING1024", 11, 0, 0, "FIZ0121").
requisito("ING1024", 11, 1, 0, "FIZ0211").
requisito("ING1024", 11, 2, 0, "QIM100E").
requisito("MAT1640", 0, 0, 0, "MAT1203").
requisito("MAT1640", 0, 1, 0, "MAT1620").
requisito("MAT1640", 1, 0, 0, "MAT1126").
requisito("MAT1640", 1, 1, 0, "MAT1203").
requisito("MAT1640", 2, 0, 0, "MAT1216").
requisito("MAT1640", 2, 1, 0, "MAT1620").
requisito("MAT1640", 3, 0, 0, "MAT1126").
requisito("MAT1640", 3, 1, 0, "MAT1216").
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
requisito("IIC2333", 0, 0, 0, "IIC2343").
requisito("IIC2333", 1, 0, 0, "IIC1222").
requisito("IIC2333", 1, 1, 0, "ING1011").
requisito("IIC2333", 2, 0, 0, "IIC1222").
requisito("IIC2333", 2, 1, 0, "IPP1000").
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

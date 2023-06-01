/*
 Navicat Premium Data Transfer

 Source Server         : nroshine
 Source Server Type    : MySQL
 Source Server Version : 50717
 Source Host           : localhost:3306
 Source Schema         : book_project

 Target Server Type    : MySQL
 Target Server Version : 50717
 File Encoding         : 65001

 Date: 01/06/2023 14:28:28
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for book
-- ----------------------------
DROP TABLE IF EXISTS `book`;
CREATE TABLE `book`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `author` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `category` int(11) NOT NULL,
  `rating` int(5) NOT NULL DEFAULT 0,
  `price` float NOT NULL,
  `image` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `description` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `pageCount` int(5) NOT NULL,
  `releaseDate` date NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 100,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_book_category`(`category`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 26 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of book
-- ----------------------------
INSERT INTO `book` VALUES (1, '1000 phát minh và khám phá vĩ đại', 'Vũ Thái Hà', 1, 3, 250000, 'https://salt.tikicdn.com/cache/280x280/ts/product/fb/21/8f/06a6a19935e1139648b67e79ef77b276.jpg', 'Ba triệu năm sáng tạo và tò mò đã tạo ra hàng chục nghìn sáng chế và phát minh.\nNhững sáng chế và phát minh từng đáp ứng được các nhu cầu cơ bản của con người - từ nhu cầu sinh tồn đến nhu cầu hiểu biết - đã giữ một vai trò lớn lao trong việc định hình thế giới của chúng.\nThường rất khó phân biệt ranh giới giữa sáng chế và phát minh, và không có cái nào trong số đó tạo ra trong một sớm một chiều.\nCó thể chúng ta sẽ sớm có đủ hiểu biết để kiểm soát chính cỗ máy cuộc sống và điều này sẽ khiến tương lai có nhiều thay đổi.\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\n1000 Phát Minh & Khám Phá Vĩ Đại\n\nBa triệu năm sáng tạo và tò mò đã tạo ra hàng chục nghìn sáng chế và phát minh.\n\nNhững sáng chế và phát minh từng đáp ứng được các nhu cầu cơ bản của con người - từ nhu cầu sinh tồn đến nhu cầu hiểu biết - đã giữ một vai trò lớn lao trong việc định hình thế giới của chúng.\n\nThường rất khó phân biệt ranh giới giữa sáng chế và phát minh, và không có cái nào trong số đó tạo ra trong một sớm một chiều.\n\nCó thể chúng ta sẽ sớm có đủ hiểu biết để kiểm soát chính cỗ máy cuộc sống và điều này sẽ khiến tương lai có nhiều thay đổi.', 300, '2023-02-03', 100);
INSERT INTO `book` VALUES (2, 'Ninja Rantaro', 'Ninja Rantaro', 2, 1, 100000, 'https://cdn0.fahasa.com/media/catalog/product/n/i/ninja-rantaro_bia_tap-7.jpg', '“Trời thu trong xanh tuyệt đẹp, khiến Shinbe buồn đi nặng (Chế từ câu thơ: Trời thu trong xanh tuyệt đẹp, khiến ngựa buồn đi nặng). Bà cấp dưỡng trong trường Ninja luôn ép bọn học trò phải ăn hết suất cơm. Nhưng theo bác, “không thể tha thứ cho kẻ nào dám để cơm thừa”. Bởi vì trên thế giới còn có biết bao nhiêu người không có lương thực mà ăn. Các cháu hãy vừa biết ơn người đã nấu cho mình, vừa ăn cho thật sạch nhé. Ôi, nói đến đây, bụng bác đã réo ầm ĩ rồi nè. Nào thì đi ăn rồi sáng tác tiếp thôi!”', 100, '2023-04-10', 200);
INSERT INTO `book` VALUES (4, 'Dã Ngoại Thảnh Thơi - Yurucamp', 'Afro', 2, 5, 250000, 'https://cdn0.fahasa.com/media/catalog/product/d/a/da-ngoai-thanh-thoi_bia_tap-12_1.jpg', '“Xin chào, tôi là afro. Cảm ơn các bạn đã mua “Dã ngoại thảnh thơi” tập 12. Lần trước, tôi đã giả vờ không nhìn thấy Yamanashi đang xây dựng một công trình ngầm ở núi Phú Sĩ, nhưng coi bộ cơ sở này quá nguy hiểm khi tính đến chuyện chi phối địa phương liền kề từ dưới lòng đất. Và chẳng biết từ bao giờ tôi đã bị tóm mất tiêu. Hiện tại tôi đang bị bắt phải đi qua một chiếc cầu treo không có tay vịn bắc trên đỉnh Yasaburotake trong khi một đám nhà giàu thừa của đang vừa ăn hoto còn dư từ bữa trước vừa la ó ầm ĩ.”', 200, '2023-02-09', 300);
INSERT INTO `book` VALUES (5, 'Đọc Con Số, Đoán Vận Mệnh', 'Huyền Trang, Diệu Vy', 0, 2, 250000, 'https://cdn0.fahasa.com/media/catalog/product/8/9/8935244882230.jpg', 'Thần số học (Numerology) là dựa vào các con số trong cuộc sống của bạn (ví dụ như số ngày tháng năm sinh, số trong tên, thậm chí cả số điện thoại, số nhà, số tài khoản ngân hàng) để khám phá về bản thân bạn. Numerology được cho rằng dựa trên ý tưởng vũ trụ là một hệ thống hoàn chỉnh và khi chia nhỏ ra, chúng ta sẽ chỉ còn lại những yếu tố cơ bản, đó là những con số. Sau đó, những con số này có thể sử dụng để giúp bạn hiểu rõ hơn về thế giới xung quanh cũng như về chính mình.\r\n\r\nMỗi con số đều mang theo năng lượng của riêng nó. Khi bạn hiểu được bản chất năng lượng của các con số thì bạn sẽ cảm nhận được bản chất của một ai đó chỉ thông qua con số đại diện cho họ.', 200, '2023-02-09', 100);
INSERT INTO `book` VALUES (6, 'Thần số học', 'Văn Cao', 0, 2, 100000, 'https://salt.tikicdn.com/cache/280x280/ts/product/c8/6f/36/17e0dd709f50c7c7530755e9b21c3865.jpg.webp', 'Ngày sinh, ngày tốt nghiệp, số nhà, số đăng ký xe, số sổ hộ khẩu, số căn cước công dân... vô vàn con số hiện diện xung quanh chúng ta mỗi ngày, và có một vài con số nhất định liên tục lặp lại. Bạn đã từng chú ý đến điều này chưa? Sự xuất hiện của các con số có thể không chỉ là điều ngẫu nhiên như bạn mặc định.\r\n\r\nVà bạn có từng nghĩ ngôn ngữ số học có thể là chìa khóa giải mã những câu hỏi về vận mệnh và ý nghĩa cuộc sống luôn thường trực trong mỗi chúng ta chưa? Những con số chứa đựng ý nghĩa sâu xa và có thể ảnh hưởng đến chúng ta nhiều hơn chúng ta vẫn nghĩ. Nếu bạn đã từng băn khoăn bạn là ai và tại sao lại sở hữu những tính cách như hiện tại; nếu bạn đã từng thắc mắc về con đường tương lai và vận mệnh của bản thân, cuốn sách này có thể cho bạn lời giải đáp hợp lý. Nếu bạn đang đau đáu về con đường sự nghiệp và mông lung không biết bản thân thực sự thích gì ; nếu bạn vẫn đang đi tìm câu hỏi về niềm đam mê và khao khát thực sự của bản thân, cuốn sách này có thể cho thể cho câu trả lời thuyết phục.', 150, '2023-02-09', 100);
INSERT INTO `book` VALUES (7, 'Vũ trụ trong vỏ hạt dẻ', 'Stephen Hawking', 1, 5, 250000, 'https://salt.tikicdn.com/cache/280x280/ts/product/d1/4a/3c/faa1946b0e80e106b8962efed7fd2749.jpg.webp', 'Stephen Hawking, một trong những nhà khoa học có ảnh hưởng nhất trong thời đại chúng ta, là một biểu tượng trí tuệ, được biết đến không chỉ vì sự mạo hiểm trong các ý tưởng, mà còn vì sự rõ ràng và hóm hỉnh mà ông thể hiện. Trong tác phẩm này, Hawking đưa chúng ta đến đỉnh cao của vật lý lý thuyết, nơi mà sự thật thường xa lạ hơn là hư cấu, để giải thích theo từ ngữ bình dân về các nguyên tắc kiểm soát vũ trụ của chúng ta.\r\nGiống như nhiều người trong cộng đồng vật lý lý thuyết, Giáo sư Hawking luôn tìm cách khám phá chén thánh của khoa học – Lý thuyết về mọi thứ. Với phong cách dễ tiếp cận và dí dỏm của mình, ông hướng dẫn chúng ta tiến từng bước một để khám phá bí mật của vũ trụ – từ siêu trọng lực đến siêu đối xứng, từ lý thuyết lượng tử đến lý thuyết M, từ phép toàn ảnh đến tính đối ngẫu. Và ông đưa chúng ta đến hậu trường của một trong những cuộc phiêu lưu trí tuệ thú vị nhất của ông khi tìm cách “kết hợp Lý thuyết tương đối tổng quát của Einstein và ý tưởng đa lịch sử của Richard Feynman thành một lý thuyết thống nhất hoàn chỉnh sẽ mô tả mọi thứ xảy ra trong vũ trụ.”', 200, '2023-02-09', 200);
INSERT INTO `book` VALUES (8, 'Vũ Trụ - Trong 30 Giây', 'Clive Gifford', 1, 4, 250000, 'https://cdn0.fahasa.com/media/catalog/product/i/m/image_220730.jpg', 'Nghệ thuật trong 30 giây (Susie Hodge): Con người đã sáng tạo nghệ thuật trong suốt hàng nghìn năm. Họ điêu khắc, vẽ, in, tạo ra những tác phẩm từ nhỏ xíu đến đồ sộ, khổng lồ. Cuốn sách khám phá câu chuyện thú vị của nghệ thuật, từ sơ khai đến hiện đại. Mỗi chương sẽ đề cập đến một thể loại nghệ thuật khác nhau, được sáng tạo ở những thời kỳ khác nhau dưới bàn tay rất nhiều nghệ sĩ.\r\n\r\nCơ thể người trong 30 giây (Anna Claybourne): Cơ thể người đã được nghiên cứu suốt hàng nghìn năm. Đó là một cỗ máy tuyệt vời, có sự sống, biết hô hấp và cực kỳ phức tạp, với giác quan cho bạn biết chuyện gì đang xảy ra xung quanh, não để suy nghĩ và đưa ra quyết định, và các cơ để giúp bạn di chuyển. Nó cũng hấp thụ thức ăn và oxy, rồi biến chúng thành năng lượng cần thiết. Cuốn sách trình bày chi tiết về tất cả các hệ, cơ quan và những khả năng kỳ diệu của cơ thể.', 200, '2023-02-09', 100);
INSERT INTO `book` VALUES (9, 'Bách Khoa Thư', 'Văn Cao', 3, 1, 100000, 'https://cdn0.fahasa.com/media/wysiwyg/hieu_kd/2023_04_frame/Artboard_1_1.png', 'Ba triệu năm sáng tạo và tò mò đã tạo ra hàng chục nghìn sáng chế và phát minh.\r\n\r\nNhững sáng chế và phát minh từng đáp ứng được các nhu cầu cơ bản của con người - từ nhu cầu sinh tồn đến nhu cầu hiểu biết - đã giữ một vai trò lớn lao trong việc định hình thế giới của chúng.\r\n\r\nThường rất khó phân biệt ranh giới giữa sáng chế và phát minh, và không có cái nào trong số đó tạo ra trong một sớm một chiều.\r\n\r\nCó thể chúng ta sẽ sớm có đủ hiểu biết để kiểm soát chính cỗ máy cuộc sống và điều này sẽ khiến tương lai có nhiều thay đổi.\r\n\r\nMã hàng	8794069302930\r\nTên Nhà Cung Cấp	ZenBooks\r\nTác giả	Roger Bridgman\r\nNgười Dịch	Vũ Thái Hả, Lê Thị Thanh Thảo\r\nNXB	Dân Trí\r\nNăm XB	2022\r\nTrọng lượng (gr)	1244\r\nKích Thước Bao Bì	28.5 x 21.5 x 2 cm\r\nSố trang	154\r\nHình thức	Bìa Cứng\r\nSản phẩm bán chạy nhất	Top 100 sản phẩm Kiến Thức Khoa Học - Tự Nhiên bán chạy của tháng\r\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\r\n1000 Phát Minh & Khám Phá Vĩ Đại\r\n\r\nBa triệu năm sáng tạo và tò mò đã tạo ra hàng chục nghìn sáng chế và phát minh.\r\n\r\nNhững sáng chế và phát minh từng đáp ứng được các nhu cầu cơ bản của con người - từ nhu cầu sinh tồn đến nhu cầu hiểu biết - đã giữ một vai trò lớn lao trong việc định hình thế giới của chúng.\r\n\r\nThường rất khó phân biệt ranh giới giữa sáng chế và phát minh, và không có cái nào trong số đó tạo ra trong một sớm một chiều.\r\n\r\nCó thể chúng ta sẽ sớm có đủ hiểu biết để kiểm soát chính cỗ máy cuộc sống và điều này sẽ khiến tương lai có nhiều thay đổi.', 100, '2023-02-09', 300);
INSERT INTO `book` VALUES (10, 'Văn Phòng Thám Tử Quái Vật', 'Sho Aimoto', 3, 5, 250000, 'https://cdn0.fahasa.com/media/catalog/product/n/x/nxbtre_full_11072023_030753.jpg', 'Ở một vùng quê yên tĩnh nọ bỗng xảy ra sự kiện gia súc chết hàng loạt rất quái lạ. Dân làng thuê vị thám tử tâm linh Inugami từ Tokyo về để điều tra vụ việc. Trong quá trình điều tra, Inugami gặp một cậu bé bị dân làng gọi bằng cái tên “Dorotabo”. Cậu bé giúp Inugami tìm ra sự thật, và để đáp lại, Inugami tiết lộ cho cậu biết cậu không phải con người, mà là một bán yêu. Từ đây, bánh xe vận mệnh của cậu bắt đầu lăn bánh, và những bí ẩn về thân thế của cậu bé dần được hé lộ.', 200, '2023-02-09', 200);
INSERT INTO `book` VALUES (11, 'Sách Giáo Khoa Bộ Lớp 1', 'Nhiều Tác Giả', 7, 3, 250000, 'https://cdn0.fahasa.com/media/catalog/product/c/o/combo-3300000026800-1901011410903.jpg', '1000 khám phá vĩ đại', 300, '2023-02-09', 100);
INSERT INTO `book` VALUES (12, 'Làm Bạn Với Bầu Trời', 'Nguyễn Nhật Ánh', 2, 1, 100000, 'https://cdn0.fahasa.com/media/catalog/product/u/n/untitled-2_44.jpg', 'Làm Bạn Với Bầu Trời\r\n\r\nMột câu chuyện giản dị, chứa đầy bất ngờ cho tới trang cuối cùng. Và đẹp lộng lẫy, vì lòng vị tha và tình yêu thương, khiến mắt rưng rưng vì một nỗi mừng vui hân hoan. Cuốn sách như một đốm lửa thắp lên lòng khát khao sống tốt trên đời.\r\n\r\nViết về điều tốt đã không dễ, viết sao cho người đọc có thể đón nhận đầy cảm xúc tích cực, và muốn được hưởng, được làm những điều tốt dù nhỏ bé... mới thật là khó. Làm bạn với bầu trời của Nguyễn Nhật Ánh đã làm được điều này.', 100, '2023-02-09', 100);
INSERT INTO `book` VALUES (13, 'Cho Tôi Xin Một Vé Đi Tuổi Thơ', 'Nguyễn Nhật Ánh', 3, 5, 250000, 'https://cdn0.fahasa.com/media/catalog/product/i/m/image_180164_1_43_1_57_1_4_1_2_1_210_1_29_1_98_1_25_1_21_1_5_1_3_1_18_1_18_1_45_1_26_1_32_1_14_1_1233.jpg', 'Cho Tôi Xin Một Vé Đi Tuổi Thơ - Phiên Bản Đặc Biệt\r\n\r\nTruyện Cho tôi xin một vé đi tuổi thơ là một trong những tác phẩm bán chạy nhất nhà văn Nguyễn Nhật Ánh. Nhà văn mời người đọc lên chuyến tàu quay ngược trở lại thăm tuổi thơ và tình bạn dễ thương của 4 bạn nhỏ. Những trò chơi dễ thương thời bé, tính cách thật thà, thẳng thắn một cách thông minh và dại dột, những ước mơ tự do trong lòng… khiến cuốn sách có thể làm các bậc phụ huynh lo lắng rồi thở phào. Không chỉ thích hợp với người đọc trẻ, cuốn sách còn có thể hấp dẫn và thực sự có ích cho người lớn trong quan hệ với con mình.', 100, '2023-02-09', 100);
INSERT INTO `book` VALUES (14, 'The Secret - Bí mật', 'Rhonda Byrne', 6, 2, 150000, 'https://cdn0.fahasa.com/media/catalog/product/9/7/9786043452792.jpg', 'Liệu Luật hấp dẫn có thực sự là một bí mật? Bạn có thể nghĩ rằng nó chỉ là một thứ huyền bí vớ vẩn, nhưng trong sách Kinh thánh cũng có một câu nói rất kinh điển, “Người có ước mơ, luôn nhận được nhiều hơn”. Đó chính là tự cảm nhận sự đầy đủ ngay từ đầu, thì bạn sẽ hấp dẫn nhiều sự đầy đủ hơn nữa.\r\n\r\nNếu bạn luôn cảm thấy thiếu thì bạn luôn nhận được tác động tương tự. Tại sao điều này xảy ra luôn là một điều huyền bí? Nhưng nếu bạn có tin hay không đi nữa thì Luật hấp dẫn của Rhonda luôn tồn tại.', 200, '2023-02-09', 100);
INSERT INTO `book` VALUES (15, 'Búp Bê Raggedy Ann', 'Johnny Gruelle', 2, 2, 50000, 'https://cdn0.fahasa.com/media/catalog/product/8/9/8935212346740.jpg', 'Búp bê Raggedy Ann là một tựa sách kinh điển cũng xưa như chính tuổi đời của cô nàng búp bê vải Raggedy thân thuộc với biết bao bạn nhỏ khắp nơi trên toàn thế giới. Những chuyến phiêu lưu đầy mộng mơ nhưng cũng không kém phần tinh nghịch của các cô cậu búp bê, mà đứng đầu là cô nàng Raggedy Ann, đã đem đến cho độc giả những giây phút thư giãn, nhẹ nhàng; truyền tải những thông điệp ý nghĩa về thời thơ ấu, về tình bạn, tình yêu thương con người.\r\n\r\nVới giọng kể hóm hỉnh đầy lôi cuốn, BÚP BÊ RAGGEDY ANN xứng đáng là cuốn sách kinh điển dành cho mọi thế hệ độc giả trên thế giới.', 100, '2023-02-09', 100);

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category`  (
  `id` int(11) NOT NULL,
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES (0, 'Thần học');
INSERT INTO `category` VALUES (1, 'Khoa học');
INSERT INTO `category` VALUES (2, 'Truyện tranh');
INSERT INTO `category` VALUES (3, 'Phiêu lưu');
INSERT INTO `category` VALUES (4, 'Kinh Tế');
INSERT INTO `category` VALUES (5, 'Giáo trình');

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idUser` int(11) NOT NULL,
  `content` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `rate` int(11) NOT NULL DEFAULT 0,
  `idBook` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES (1, 1, 'sách hay lắm', 5, 1);
INSERT INTO `comment` VALUES (2, 2, 'sách hay lắm', 5, 1);
INSERT INTO `comment` VALUES (3, 3, 'sách này ok nè mở mang lắm', 3, 1);
INSERT INTO `comment` VALUES (4, 4, 'tạm', 2, 1);
INSERT INTO `comment` VALUES (6, 4, 'hay', 3, 2);
INSERT INTO `comment` VALUES (7, 4, 'cũng dc nên mua', 2, 14);
INSERT INTO `comment` VALUES (8, 2, 'đọc để tham khảo được', 2, 5);
INSERT INTO `comment` VALUES (9, 4, 'sách hay nên mua', 4, 12);
INSERT INTO `comment` VALUES (10, 2, 'tạm dc', 2, 10);
INSERT INTO `comment` VALUES (11, 2, 'đúng đúng cho 5 sao', 5, 12);
INSERT INTO `comment` VALUES (12, 2, 'hay', 2, 4);
INSERT INTO `comment` VALUES (13, 1, 'tôi mua 10 quyển', 5, 1);
INSERT INTO `comment` VALUES (14, 2, 'dc ', 0, 2);

-- ----------------------------
-- Table structure for order_book
-- ----------------------------
DROP TABLE IF EXISTS `order_book`;
CREATE TABLE `order_book`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idUser` int(11) NOT NULL,
  `idBook` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `status` int(5) NOT NULL DEFAULT 0,
  `perchaseDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `receivedDate` datetime NULL DEFAULT NULL,
  `method_payment` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 23 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of order_book
-- ----------------------------
INSERT INTO `order_book` VALUES (2, 1, 1, 1, 2, '2023-05-28 17:31:08', '2023-06-01 00:21:08', 'Thanh toán khi nhận hàng');
INSERT INTO `order_book` VALUES (3, 1, 1, 3, 2, '2023-05-30 12:03:07', '2023-05-31 23:28:43', 'Thanh toán qua ATM');
INSERT INTO `order_book` VALUES (4, 1, 1, 2, 2, '2023-05-30 18:59:39', '2023-06-01 10:12:45', 'Thanh toán khi nhận hàng');
INSERT INTO `order_book` VALUES (5, 2, 2, 2, 2, '2023-05-31 14:31:06', '2023-06-01 10:12:45', 'Thanh toán khi nhận hàng');
INSERT INTO `order_book` VALUES (6, 1, 2, 1, 2, '2023-05-31 14:36:22', '2023-06-01 10:12:45', 'Thanh toán khi nhận hàng');
INSERT INTO `order_book` VALUES (8, 2, 4, 1, 2, '2023-05-31 14:49:46', '2023-06-01 10:12:45', 'Thanh toán khi nhận hàng');
INSERT INTO `order_book` VALUES (9, 2, 8, 1, 2, '2023-05-31 17:10:48', '2023-06-01 00:18:21', 'Thanh toán qua MOMO');
INSERT INTO `order_book` VALUES (15, 1, 1, 2, 2, '2023-05-31 23:33:30', '2023-05-31 23:33:40', 'Thanh toán khi nhận hàng');
INSERT INTO `order_book` VALUES (17, 1, 12, 1, 2, '2023-06-01 00:19:09', '2023-06-01 00:22:17', 'Thanh toán qua ATM');
INSERT INTO `order_book` VALUES (19, 1, 2, 1, 2, '2023-06-01 00:23:25', '2023-06-01 00:24:15', 'Thanh toán qua ATM');
INSERT INTO `order_book` VALUES (20, 1, 2, 1, 2, '2023-06-01 00:27:15', '2023-06-01 00:44:16', 'Thanh toán qua ATM');
INSERT INTO `order_book` VALUES (21, 1, 2, 1, 0, '2023-06-01 00:43:02', NULL, 'Thanh toán qua ATM');
INSERT INTO `order_book` VALUES (22, 1, 15, 1, 0, '2023-06-01 13:24:57', NULL, 'Thanh toán qua MOMO');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `email` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `isadmin` int(5) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'Thành Phước', 'admin', '123', 'hà đông, hà nội', 'thanhphuocx10@gmail.com', 1);
INSERT INTO `user` VALUES (2, 'Tố Hữu', 'test01', '123', 'thành phố hải phòng', 'test01@gmail.com', 0);
INSERT INTO `user` VALUES (3, 'Nam Cao', 'test02', '123', 'Cầu Giấy, Hà Nội', 'test02@gmail.com', 0);
INSERT INTO `user` VALUES (4, 'noob', 'noobpro', '123', 'cầu giấy, hà nội', 'noob@gmail.com', 0);
INSERT INTO `user` VALUES (5, 'test03', 'test03', '123', 'nam định', 'test03@gmail.com', 0);

SET FOREIGN_KEY_CHECKS = 1;

-- Create user table
CREATE TABLE `user` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    passwordHash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL

);

-- Create post table
CREATE TABLE post (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    authorId INT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (authorId) REFERENCES `user` (id)
);

-- Create index on authorId for better query performance
CREATE INDEX idx_post_authorId ON post(authorId);


-- Insert users and posts for testing
INSERT INTO `user` (email, passwordHash, name) VALUES
('user1@example.com', 'hashed_password1', 'John Doe'),
('user2@example.com', 'hashed_password2', 'Foo Bar'),
('user3@example.com', 'hashed_password3', 'Craig Bobb');


INSERT INTO post (title, content, authorId) VALUES
('The Future of AI: Trends to Watch in 2024', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nec vehicula eros. Quisque consequat ligula nec nisi tincidunt, in facilisis justo vehicula. Nam euismod, felis a eleifend feugiat, arcu massa convallis tortor, in luctus odio eros eu nulla. Donec eget magna ut nulla luctus vehicula. Suspendisse potenti. Sed nec ultricies dui. Aenean varius eros id libero vestibulum, vel facilisis urna porttitor. Praesent sit amet ornare libero, sed viverra purus. Duis dapibus vehicula mauris, et ultrices mauris laoreet vel. Suspendisse tincidunt nulla ut tellus fringilla, a eleifend felis ullamcorper. Duis ut metus nisi. Sed varius sapien vel arcu vestibulum, sed ullamcorper lacus elementum.', 3),
('10 Best Practices for Software Engineers', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam erat volutpat. Integer posuere urna sit amet ex lacinia, eget aliquam ligula luctus. Vestibulum vitae neque turpis. Nulla porttitor dignissim tortor, nec porttitor lorem dictum id. Fusce euismod sapien et libero vulputate, quis ultricies libero pretium. Mauris in ligula quis ante pulvinar facilisis. Vestibulum sit amet feugiat libero, vitae suscipit ligula. Suspendisse non risus at lorem tincidunt eleifend. Phasellus eget metus eget metus vehicula posuere. Proin ut urna et arcu iaculis ultrices et ac dui. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut volutpat, nisl et venenatis sollicitudin, mauris urna volutpat magna, a aliquam sapien lacus euismod leo.', 1),
('Building Responsive Websites: A Complete Guide', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac lacus eu ligula vehicula vehicula sit amet vel nisl. Nam vel congue elit, ac suscipit turpis. Praesent nec nisl at purus fermentum suscipit. Fusce sed sapien ut elit pharetra bibendum. Donec viverra lectus in sem scelerisque, eget venenatis ex vehicula. Nulla facilisi. Nam nec dignissim leo. Vestibulum in urna vehicula, laoreet arcu non, vestibulum velit. Nulla facilisi. Nam non erat nec ligula tincidunt hendrerit ut nec eros. Phasellus bibendum arcu in velit vestibulum, nec varius erat fringilla. Mauris dapibus magna id erat tincidunt laoreet. Nulla at sagittis odio. Integer non facilisis nunc, ac fringilla odio.', 2),
('Understanding Machine Learning Algorithms', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lacinia nunc ac diam scelerisque, ut congue metus lacinia. In aliquet, erat in ullamcorper scelerisque, odio eros ultricies enim, sit amet gravida magna ex vitae dui. Donec posuere libero id elit euismod, sed ultrices eros pharetra. Aliquam erat volutpat. Curabitur vehicula tristique libero, nec vestibulum risus dapibus nec. Integer feugiat libero a mi dictum, vel sollicitudin risus volutpat. Sed nec risus vel arcu pulvinar elementum. Cras volutpat, lacus eu volutpat malesuada, lacus risus aliquet arcu, et vehicula enim felis eu lorem. Cras id nunc in turpis dictum hendrerit non eu erat.', 3),
('Advanced JavaScript Techniques for Web Developers', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aenean non elit augue. Nullam ac felis sed justo tincidunt feugiat ac id tortor. Nulla facilisi. Sed suscipit, lacus in tristique luctus, est urna consectetur dolor, at cursus nulla eros nec erat. Praesent vel justo enim. Curabitur convallis vehicula nisl, et egestas erat fringilla sed. Etiam sodales purus nec sapien pulvinar, vel fermentum ex iaculis. Aliquam erat volutpat. Sed in vehicula urna. Integer vitae justo nec erat viverra dignissim. Nullam vel mi nec dui venenatis gravida.', 1);

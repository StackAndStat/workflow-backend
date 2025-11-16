CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_name UNIQUE (name)
);

CREATE TABLE todos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'todo' 
        CHECK (status IN ('todo', 'in-progress', 'completed')),
    priority VARCHAR(20) NOT NULL DEFAULT 'medium'
        CHECK (priority IN ('low', 'medium', 'high')),
    category VARCHAR(50) NOT NULL,
    due_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
   
    user_id INTEGER NOT NULL,
    
    CONSTRAINT fk_user
        FOREIGN KEY (user_id) 
        REFERENCES users(id)
        ON DELETE CASCADE 
);


CREATE INDEX idx_todos_user_id ON todos(user_id);
CREATE INDEX idx_todos_status ON todos(status);
CREATE INDEX idx_todos_priority ON todos(priority);
CREATE INDEX idx_todos_due_date ON todos(due_date);

INSERT INTO todos (title, description, status, priority, category, due_date, created_at, user_id) VALUES
('Design new landing page', 'Create wireframes and mockups for the new marketing site', 'in-progress', 'high', 'Design', '2025-11-15', '2025-11-08', 1),
('Review pull requests', 'Check and merge pending PRs from the team', 'todo', 'medium', 'Development', '2025-11-12', '2025-11-09', 1),
('Update documentation', 'Add API documentation for new endpoints', 'completed', 'low', 'Documentation', '2025-11-10', '2025-11-07', 1),
('Team meeting preparation', 'Prepare slides and agenda for sprint planning', 'todo', 'high', 'Meetings', '2025-11-11', '2025-11-09', 1),
('Bug fix: Login validation', 'Fix the email validation issue on login page', 'in-progress', 'high', 'Development', '2025-11-11', '2025-11-10', 1);
class AddIntoToPresLinks < ActiveRecord::Migration[5.2]
  def change
    add_column :presentation_links, :company, :string
    add_column :presentation_links, :expiration_date, :date
  end
end
